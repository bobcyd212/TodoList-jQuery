$('.new-todo').on('keydown',function(e){
	if(e.keyCode === 13){
		editing(e,$('.todo-list'))	
        $('.todo-list li').on('click','.toggle',function(e){
        	var li = $(e.currentTarget).closest('li')
        	count()
        	li.addClass('completed')
        	$('.clear-completed').addClass('active')
        })
        $('.editIcon').on('click',function(e){
            var li = $(e.currentTarget).closest('li').addClass('editing')
            var label = li.find('.edit')
            var content = li.find('#text')
            $('.edit').on('keydown',function(e){
	        	if(e.keyCode === 13){ 
	        	if(!label.val().trim().length){return}
	        	  li.removeClass('editing')  
	        	content.text(label.val().trim())
	            
            }
            })
        })  
	}
})
$('#active').on('click',function(){
	var $comp = $(".todo-list li[class = 'completed']")	
	var $uncomp = $(".todo-list li:not('.completed')")
	    toggleClass($('#active'),'selected')
    	$comp.hide() 
    	$uncomp.show(); 
 })
$('#all').on('click',function(){
    var $item = $(".todo-list li")
    if($item.is(':hidden')){$item.css('display','block')}
    toggleClass($('#all'),'selected')
 })
$('#completed').on('click',function(){
    var $comp = $(".todo-list li[class = 'completed']")	
    var $uncomp = $(".todo-list li:not('.completed')")	
    toggleClass($('#completed'),'selected')
    $comp.show();
    $uncomp.hide();
})
$('.clear-completed').on('click',function(){
	var $comp = $(".todo-list li[class = 'completed']")	
	$comp.remove()
	clearComplete()

})
$('.todo-list').on('click','button',function(e){
	$(e.target).closest('li').remove()
	count()
	clearComplete()
})

function clearComplete(){
	var leftNum = $(':input[name=items]:checked').length
	if(leftNum === 0 && $('.clear-completed').hasClass('active')){
   	$('.clear-completed').removeClass('active')}
}

function toggleClass($el,className){
	$el.addClass(className)
	$el.parent().siblings().children().removeClass(className)	
}
function showFooter(num){
   var len = $('.todo-list>li').length
	var $footer = $('.footer')
	if(!len){$footer.removeClass('show')}
    else{
    	if(!$footer.hasClass('show')){$footer.addClass('show')}
    	var ftTemplate =`
            <strong>${num}</strong> 
            未做
		`
		$('.footer>span').html(ftTemplate)
    }
}
function count(){
	var num =  $(':input[name=items]:not(:checked)').length    
	return showFooter(num)
}
function editing(e,$el){
    var val = $(e.currentTarget).val().trim();
    if(val.length === 0){return}
	var contTemplate = template(e)
	$el.append(contTemplate)
	e.target.value = ''
	 count()
}
function template(e){
	return`
	<li>
	        <div class="view">
	            <input name="items" type="checkbox" class="toggle">
	            <label id="text">${e.target.value}</label>
	            <span class="editIcon">编辑</span>
	            <button class="destroy"></button>
	        </div>
	        <input type="text" class="edit" value="${e.target.value}">
        </li>
	`
}

