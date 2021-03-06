(function($) {
  var $widget = $('#blendid-lang'),
      $spinner = $widget.find('.spinner'),
      $button  = $('#vl-generate-mo-file'),
      isLoading = false;
  
  $button.on('click', function(e){
    if (isLoading)
      return;
    
    toggleLoading();
    
    $('#vl-generate-result').text("");
    
    var data = {
      action: 'vl-generate-mo-file',
      nonce: blendid.nonce
    };
    
    $.post(ajaxurl, data, function(response){
      var out = "";

      if (response.success) {
        for (var poFile in response.data) {
          out += "<div>" + poFile + ": " + (response.data[poFile] ? "success" : "fail") + "</div>";
        }
      } else {
        out += "<div>Ajax failed</div>";
      }
      
      $('#vl-generate-result').html(out);

      toggleLoading();
    });
  });
  
  function toggleLoading() {
    if (isLoading) {
      $button.prop('disabled', false);
      $spinner.hide();
    } else {
      $button.prop('disabled', true);
      $spinner.css('display', 'inline-block');
    }
    
    isLoading = !isLoading;
  }
}(jQuery));