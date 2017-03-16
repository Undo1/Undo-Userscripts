// ==UserScript==
// @name         CommentFlagReview
// @namespace    Undo
// @version      0.1
// @description  Adds a fake /review queue for comment flags.
// @author       Undo
// @include       http*://stackoverflow.com/*
// @include       http*://meta.stackoverflow.com/*
// @include       http*://dev.stackoverflow.com/*
// @include       http*://askubuntu.com/*
// @include       http*://meta.askubuntu.com/*
// @include       http*://superuser.com/*
// @include       http*://meta.superuser.com/*
// @include       http*://serverfault.com/*
// @include       http*://meta.serverfault.com/*
// @include       http*://mathoverflow.net/*
// @include       http*://meta.mathoverflow.net/*
// @include       http*://*.stackexchange.com/*
// ==/UserScript==

(function() {
    'use strict';

    // Holds a list of flagged comments keyed by the post that was flagged
    var flagged_comments = [ ];
    var current_item;

    if (StackExchange.options.user.isModerator === undefined) {
        // Not a moderator on this site
        return;
    }

    if (window.location.pathname == "/review") {
        // We're on /review; add the row and populate it with comment flag count
        var dashboard_row = $(`
            <div class="dashboard-item" id="comment-flag-review-row">
                <div class="dashboard-count">
                    <div class="dashboard-num">...</div>
                    <div class="dashboard-unit">flags</div>
                </div>
                <div class="dashboard-summary">
                    <div class="dashboard-title">
                        <a href="/review/comment-flags" style="color: #c00">Comment Flags</a>
                    </div>
                    <div class="dashboard-description">Handle comment flags</div>
                </div>
                <br class="cbt">
            </div>
        }
        `);

        $("div.review-dashboard-mainbar div.subheader").after(dashboard_row);

        $.get("/admin/dashboard?flags=commentflags").success(function(data) {
           $("#comment-flag-review-row .dashboard-num").html($(data).find("div.c-flag span.bounty-indicator-tab").html());
        });
    }
    else if (window.location.pathname == "/review/comment-flags") {
        initReviewPage();

        // Get pending comment flags and populate flagged_comments
        $.get("/admin/dashboard?flags=commentflags").success(function(data) {
            var rows = $(data).find("tr.c-flag.flagged-post-row");
            $.each(rows, function(index, row) {
                var post_link_e = $(row).find("a.answer-hyperlink, a.question-hyperlink");

                var post_url = post_link_e.attr('href');
                var post_title = post_link_e.text();

                var post_id = row.dataset.postId;

                var comments = $.map($(row).find("table.comments tr.comment"), function(comment) {
                    return comment.id.split("-").reverse()[0];
                });

                flagged_comments.push({'post': {'id': post_id, 'title': post_title, 'url': post_url}, 'comments': comments});
            });
            presentNextReviewItem();
        });
    }

    function popNextReviewItem() {
        return flagged_comments.pop();
    }

    function presentNextReviewItem() {
        $(".review-actions input").prop('disabled', true);

        current_item = popNextReviewItem();

        $("#comment-flag-post-link").attr('href', current_item.post.url);
        $("#comment-flag-post-link").text(current_item.post.title);

        $.get(`/posts/${current_item.post.id}/comments?includeDeleted=true`).success(function(data) {
            $("div.review-content .comments").html($(data));
            $(".comment-actions table").remove();

            $.each(current_item.comments, function(index, flagged_comment) {
                console.log($(`tr#comment-${flagged_comment} .comment-actions`));
                $(`tr#comment-${flagged_comment} .comment-actions`).css("border-left", "25px solid #0077dd");
            });
            $(".review-actions input").prop('disabled', false);
        });
    }

    function initReviewPage() {
        document.title = 'Review Comment Flags';

        var content = `
          <div class="mainbar-full">
            <div class="subheader tools-rev">
              <h1>
                <a href="/review">Review</a><span class="lsep">|</span><span class="review-title">Comment Flags</span>
              </h1>
            </div>

            <div class="review-bar-container">
              <div class="review-bar-anchor"></div>
              <div class="review-bar" style="position: static; margin-top: 0px;">
                <div class="review-summary">
                  <span class="review-instructions infobox">Delete comments or decline the flags thereon
                  </div>

                  <div class="review-actions-container">
                    <input type="button" value="|" style="visibility: hidden; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important;">
                    <span class="review-actions">
                      <input type="button" id="comment-flags-decline-flagged" value="Decline All" title="Decline all comment flags on this post">
                      <input type="button" id="comment-flags-delete-flagged" value="Delete All Flagged" title="Delete all flagged comments on this post">
                      <input type="button" id="comment-flags-purge" value="Purge All" title="Delete all comments on this post, flagged or not">
                      <input type="button" id="comment-flags-skip" value="Skip" title="Skip these flags">
                    </span>
                  </div>

                  <br class="cbt">
                </div>
              </div>
            </div>

            <div class="review-content" style="padding-top: 0px; opacity: 1;">
              <a href="#" id="comment-flag-post-link"></a>
              <div class="comments" style="width: 100%"></div>
              <br class="cbt">
            </div>
          </div>`;

        $("div#content").html($(content));

        $(".review-actions #comment-flags-skip").on("click", function() {
            presentNextReviewItem();
        });

        $(".review-actions #comment-flags-purge").on("click", function() {
            $(".review-actions input").prop('disabled', true);

            $.post(`/admin/posts/${current_item.post.id}/delete-comments`,
                   {'fkey': StackExchange.options.user.fkey})
                   .always( function(data) {
                     console.log(data);
                     presentNextReviewItem();
                   });
        });

        $(".review-actions #comment-flags-delete-flagged").on("click", function() {
            $(".review-actions input").prop('disabled', true);
            $.each(current_item.comments, function(index, flagged_comment) {
                $.post(`/posts/comments/${flagged_comment}/vote/10`,
                       {'fkey': StackExchange.options.user.fkey});
            });
            presentNextReviewItem();
        });

        $(".review-actions #comment-flags-decline-flagged").on("click", function() {
            $(".review-actions input").prop('disabled', true);

            $.each(current_item.comments, function(index, flagged_comment) {
                $.post(`/admin/comment/${flagged_comment}/clear-flags`,
                       {'fkey': StackExchange.options.user.fkey});
            });
            presentNextReviewItem();
        });
    }
})();
