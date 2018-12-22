$(document).ready(function () {
    const JQ_IDs = {
        admin_form
    };

    Object.keys(JQ_IDs).forEach(key => {
        JQ_IDs[key] = $(`#${key}`);
    });
    // console.log(JQ_IDs);

    JQ_IDs.admin_form.submit(function(event) {
        this.classList.remove('was-validated');
        
        if(this.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.add('was-validated');
            return false;
        }

        console.log($(this).serializeArray());

        let formObj = $(this).serializeArray().reduce((prevObj, {name, value}) => Object.assign({[name]: value}, prevObj), {});
        console.log(formObj);

        $.ajax({
            type: 'GET',
            url: '/admin',
            // crossDomain: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader(
                  'Authorization', 'Basic ' 
                  + btoa(unescape(encodeURIComponent(`admin:${formObj.pw_input}`))))
            }
          }).then( _ => {
              location.reload();
          }).catch(err => {
              console.log("ajax GET err:\n", err);
          });
    });

    /* var $admin_form = $("#admin_form");
    // Get references to page elements
    var $exampleText = $("#example-text");
    var $exampleDescription = $("#example-description");
    var $submitBtn = $("#submit");
    var $exampleList = $("#example-list");
  
    // The API object contains methods for each kind of request we'll make
    var API = {
      saveExample: function (example) {
        return $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "api/examples",
          data: JSON.stringify(example)
        });
      },
      getExamples: function () {
        return $.ajax({
          url: "api/examples",
          type: "GET"
        });
      },
      deleteExample: function (id) {
        return $.ajax({
          url: "api/examples/" + id,
          type: "DELETE"
        });
      }
    };
  
    // refreshExamples gets new examples from the db and repopulates the list
    var refreshExamples = function () {
      API.getExamples().then(function (data) {
        var $examples = data.map(function (example) {
          var $a = $("<a>")
            .text(example.text)
            .attr("href", "/example/" + example.id);
  
          var $li = $("<li>")
            .attr({
              class: "list-group-item",
              "data-id": example.id
            })
            .append($a);
  
          var $button = $("<button>")
            .addClass("btn btn-danger float-right delete")
            .text("ｘ");
  
          $li.append($button);
  
          return $li;
        });
  
        $exampleList.empty();
        $exampleList.append($examples);
      });
    };
  
    // handleFormSubmit is called whenever we submit a new example
    // Save the new example to the db and refresh the list
    var handleFormSubmit = function (event) {
      event.preventDefault();
  
      var example = {
        text: $exampleText.val().trim(),
        description: $exampleDescription.val().trim()
      };
  
      if (!(example.text && example.description)) {
        alert("You must enter an example text and description!");
        return;
      }
  
      API.saveExample(example).then(function () {
        refreshExamples();
      });
  
      $exampleText.val("");
      $exampleDescription.val("");
    };
  
    // handleDeleteBtnClick is called when an example's delete button is clicked
    // Remove the example from the db and refresh the list
    var handleDeleteBtnClick = function () {
      var idToDelete = $(this)
        .parent()
        .attr("data-id");
  
      API.deleteExample(idToDelete).then(function () {
        refreshExamples();
      });
    };
  
    // Add event listeners to the submit and delete buttons
    $submitBtn.on("click", handleFormSubmit);
    $exampleList.on("click", ".delete", handleDeleteBtnClick); */
  });
  