$(document).ready(function(){
  var listo = [];
  var newTask = $('#newTaskForm');
  var newItem = $('#newItemInput');
  var saveNew = $('#saveNewItem');



  newTask.hide();
  var Task = function(task){
    this.task = task;
    this.id = 'new';
  }
var addTask = function(task){
  if(task){
    task = new Task(task);
    listo.push(task);

    newItem.val('');
    $('#newList').append(
      '<a href ="#finish" class="" id="item">' +
      '<li class="list-group-item">' +
      '<h3>' + task.task + '</h3>' +
      '<span class="arrow pull-right">' +
      '<i class-"glyphicon glyphicon-arrow-right">' +
      '</span>' +
      '</li>' +
      '</a>'

    );
  }
  newTask.slideToggle('fast', 'linear');
};

$('#add-todo').on('click', function(){
  newItem.focus();
});

saveNew.on('click', function(e){
  e.preventDefault();
  var task = newItem.val().trim();
  addTask(task);
});

saveNew.hover(function(){
  $(this).css('cursor', 'pointer');
});

newItem.bind('keypress', function(e){
  var key = e.which;
  if(key === 13){
    saveNew.trigger('click');
  }
});


$('#add-todo').on('click', function(){
  newTask.fadeToggle('fast', 'linear');
});

$('#cancel').on('click', function(e){
  e.preventDefault();
  newTask.fadeToggle('fast', 'linear');
});

var advanceTask = function(task){
  var modified = task.innerText.trim();
  for(var i = 0; i < listo.length; i++){
    if(listo[i].task === modified){
      if(listo[i].id === 'new'){
        listo[i].id === 'inProgress';
      }else if(listo[i].id === 'inProgress'){
        listo[i].id = 'archived';
      }else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};


$(document).on('click', '#item', function(e){
  e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function(e){
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

$(document).on('click', '#archvied', function(e){
  e.preventDefault();
  var task = this;
  advanceTask(task);
});



});
