var currentPlanet = {};
var showForm = false;
var editingPlanet;

$(document).ready( function() {

  $("#toggle").on("click", function() {
    toggle();
  })

  function toggle() {
    showForm = !showForm;
    $("#planet-form").remove();
    $("#planets-list").toggle();

    if (showForm) {
      $.ajax({
        url: "/planet_form",
        method: "GET"
      }).done(function (html) {
        $("#toggle").after(html);
      })
    }
  }

  function getPlanet(id) {
    $.ajax({
      url: '/planets/' + id,
      method: 'GET'
    }).done( function(planet) {
      $('#planets-list').append(planet);
    });
  }

  $(document).on("submit", "#planet-form form", function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
      url: "/planets",
      method: "POST",
      dataType: "JSON",
      data: data
    }).done( function(planet) {
      toggle();
      var g = '<li class="planet-item" data-id="' + planet.id + '" data-name="' + planet.name + '">' + planet.name + '</li>';
      $("#planets-list").append(g);
    })
  })

  $(document).on('click', '#edit-planet', function() {
    toggle();
  });

  $(document).on("click", ".planet-item", function() {
    currentPlanet.id = this.dataset.id;
    currentPlanet.name = this.dataset.name;
    $.ajax({
      url: "/planets/" + currentPlanet.id + "/moons",
      method: "GET",
      dataType: "JSON"
    }).done( function(moons) {
      var list = $("#moons");
      $("#planet").text("Moons of " + currentPlanet.name);
      list.empty();
      moons.forEach( function(char) {
        var li = '<li data-moon-id="' + char.id + '">' + char.name + '</li>';
        list.append(li);
      })
    })
  })
})
