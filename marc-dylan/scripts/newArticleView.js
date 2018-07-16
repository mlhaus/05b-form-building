'use strict';

let newArticleView = {};

newArticleView.handleMainNav = () => {
  $('nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('nav .tab:first').click();
};

newArticleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENT: Where is this function called? Why?
// This function is called at the end of the script lists in new.html
newArticleView.initNewArticlePage = () => {
  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later or otherwise edit the tab navigation.
  newArticleView.handleMainNav();

  // TODO: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. 
  $('#article-json').on('focus', function(){
    this.select();
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  $('#new-form').on('submit', function(event) {
    event.preventDefault();
    // TODO: Set up a variable to hold the new article we are creating.
    let articleDataObj = {};
    articleDataObj.title = $('#article-title').val();
    articleDataObj.category = $('#article-category').val();
    articleDataObj.author = $('#article-author').val();
    articleDataObj.authorUrl = $('#article-author-url').val();
    let today = new Date();
    let dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let isPublished = $('#article-published').is(':checked');
    articleDataObj.publishedOn = isPublished ? dateString : null;
    // prop('checked') also works
    articleDataObj.body = $('#article-body').val();

    // TODO: Instantiate an article based on what's in the form fields:
    let article = new Article(articleDataObj);

    // TODO: Use our interface to the Handblebars template to put this new article into the DOM:
    // Clear out the #articles element, so we can put in the updated preview
    $('#articles #preview').empty().append(article.toHtml());

    // TODO: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():
    $('pre code').each();

    // TODO: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
    $('#article-json').val(JSON.stringify(articleDataObj) + ',');
    newArticleView.setTeasers();
    $('nav .tab:last').click();
  });
};