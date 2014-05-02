var handleShortener = function(form) {
  form.submit(function(event) {
    event.preventDefault();

    $.ajax(
      form.attr('action'),
      {
        type: form.attr('method'),
        data: form.serialize()
      }
    ).done(function(data) {
      if (!data.error) {
        var shortenedUrl = form.data('host') + '/' + data.data.id;
        var htmlContent =
          "<input class='shortener__url--output' type='text' disabled value='" + shortenedUrl + "'>" +
          "<button class='shortener__button--revert'>New</button>" +
          "<span class='shortener__notification'>Hit Ctrl/Cmd-C to copy to clipboard.</span>";

        form.flip({
          speed: 250,
          content: htmlContent,
          dontChangeColor: true,
          onEnd: function() {
            form.find('.shortener__url--output').focus();
            form.find('.shortener__url--output').select();
            form.find('.shortener__button--revert').click(function() {
              form.revertFlip();
            });

            form.find('.shortener__notification').removeClass('error');

            if (form.hasClass('shortened')) {
              form.removeClass("shortened");
              form.find('.shortener__notification').text('');
            } else {
              form.addClass("shortened");
            }
          }
        });
      } else {
        form.find('.shortener__notification').addClass('error').text(data.error);
      }
    }).fail(function(data) {
      form.find('.shortener__notification').addClass('error').text('Some error occurred');
    });
  });
}

$(document).ready(function() {
  var form = $('form.shortener');

  if (form.length == 1) {
    handleShortener(form);
  }
});
