$(function(){
	$.getJSON("category.json", function (data){
		var content = '';
		$.each(data,function(key,value){
			//二级目录
			if(key=='1'){
				var child_category = '<div class="card-content tab-panel is-active"><div class="columns is-multiline is-gapless">';
			}else{
				var child_category = '<div class="card-content tab-panel" style="display: none;"><div class="columns is-multiline is-gapless">';
			}
			
			$.each(value.category,function(k,v){
				if(v.direct_url){
					var href = v.direct_url;
				}else{
					var href = '/product_index/index.html?id='+key+'_'+k;
				}
				child_category += '<div class="column is-4 has-text-centered is-centered"><a class="card" href="'+href+'" target="_blank"><h5 class="title">'+v.name+'</h5><p class="is-text-small is-text-gray">'+v.content+'</p><p>Learn more<img src="/images/icons/black.svg"></p></a></div>';
			});
			child_category += '</div></div>';
			//一级目录
			if(key=='1'){
				content += '<li class="is-active"><a>'+value.name+'</a></li>';
			}else{
				content += '<li><a>'+value.name+'</a></li>';
			}
			$('#child_content').append(child_category);
		});
		$('#ul_content').html(content);
		tabs($('.price .subtabs'), $('.price .subtab-content'), 'click');
	});
	
});

function tabs(tabMenu, tabContent, event, activeClass, index) {
    activeClass = activeClass || 'is-active'
    index = parseInt(index) || 0
    tabMenu.find('> ul > li').eq(index).addClass(activeClass)
    tabContent.find('> .tab-panel').eq(index).addClass(activeClass)
    tabMenu.find('> ul > li').on(event || 'click', function (e) {
        $(this).addClass(activeClass).siblings().removeClass(activeClass);
        var index = tabMenu.find('> ul > li').index(this);
        var currTabContent = tabContent.find('> .tab-panel').eq(index);
        currTabContent.show().siblings().removeClass(activeClass).hide();
        currTabContent.addClass(activeClass);
    });
};