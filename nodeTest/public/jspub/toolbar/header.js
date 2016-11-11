
function headerInit(){
    var coords, downMoveEnd, getCoords, getDirection, hideSubmenu, lastPoint, menuEl, menuList, setPaddingLeft, showSubmenu, subMenuEl, subMenuEls;
    menuList = $('#J_Menu li');
    subMenuEl = $('#J_subMenus');
    menuEl = $('#J_Menu');
    subMenuEls = $('.sub-menu');
    coords = [];
    lastPoint = {};
    downMoveEnd = {};
    getCoords = function() {
    	var coords_Arr;
    	coords_Arr = [];
    	$.each(menuList, function(index,o){
    	  	var coord;
	        coord = {
	          'start': $(o).offset().left,
	          'end': $(o).offset().left + $(o).width(),
	          'elm': $(o)
	        };
	        return coords_Arr.push(coord);
    	});
    	return coords_Arr;
    };
    setPaddingLeft = function() {
    	coords = getCoords();
    	return $.each(menuList, function(index, o) {
    		var menuId, menuType, _left = null, _menu_width;
	        menuId = '#' + $(o).attr('data-menu') + ' .first';
	        menuType = $(o).attr('data-case');
	        if (menuType === 'one') {
	        	_left = $(o).one('h2').offset().left;
	        } else if (menuType === 'two') {
	        	_left = $('.header-inner nav').offset().left + 30;
	        } else if (menuType === 'three') {
	        	_menu_width = $(window).width() > 1200 ? 290 : 230;
	        	_left = menuEl.offset().left + menuEl.width() - _menu_width - parseInt($(o).css('padding-right'));
	        }
	        if(index == menuList.length-1||index==menuList.length-2){
	        	_left-=60;
	        }
	        return $(menuId).css({marginLeft: _left});
      });
    };
    showSubmenu = function(li) {
    	var menuId, rowEl;
    	rowEl = $(li);
    	menuId = '#' + rowEl.attr('data-menu');
    	rowEl.addClass('selected').siblings().removeClass('selected');
    	return $(menuId).addClass('show').siblings().removeClass('show');
    };
    hideSubmenu = function() {
    	$('.sub-menu').removeClass('show');
    	return menuList.removeClass('selected');
    };
    getDirection = function(e, xy) {
    	var currentPoint, dir = null;
	      currentPoint = {
	    		  x: e.pageX,
	    		  y: e.pageY
	      };
      if (xy === 'y') {
    	  if (lastPoint.y > currentPoint.y) {
    		  dir = 'up';
    	  } else if (lastPoint.y < currentPoint.y) {
    		  dir = 'down';
    	  } else if (lastPoint.y = currentPoint.y) {
    		  dir = 'hor';
    	  }
      } else {
    	  if (lastPoint.x > currentPoint.x) {
    		  dir = 'left';
    	  } else if (lastPoint.x < currentPoint.x) {
    		  dir = 'right';
    	  } else if (lastPoint.x = currentPoint.x) {
    		  dir = 'hor';
    	  }
      }
      lastPoint = currentPoint;
      return dir;
    };
    setPaddingLeft();
    menuEl.on('mouseleave', function(e) {
        return setTimeout(function() {
        	var _left, _width;
        	_left = menuEl.offset().left;
        	_width = menuEl.width();
        	if (((e.pageX < _left || e.pageX > _left + _width) && e.pageY < 75) || e.pageY < 0) {
        		return hideSubmenu();
        	}
        }, 400);
    }).on('mousemove', function(e) {
        var dir = getDirection(e, 'y');
        if (dir === 'up' || dir === 'hor') {
        	return $.each(coords, function(i, o) {
        		if (o.start < e.pageX && e.pageX < o.end) {
        			return showSubmenu(o.elm);
        		}
        	});
        } else {
        	clearTimeout(downMoveEnd);
        	return downMoveEnd = setTimeout(function() {
        		if (e < 75) {
        			return $.each(coords, function(i, o) {
        				if (o.start < e.pageX && e.pageX < o.end) {
        					return showSubmenu(o.elm);
        				}
        			});
        		}
        	}, 800);
        }
    });
    subMenuEls.on('mouseleave', function(e) {
        var dir, _left, _width;
        dir = getDirection(e, 'y');
        if (dir === 'down') {
        	hideSubmenu();
        }
        if (dir === 'up') {
        	_left = menuEl.offset().left;
        	_width = menuEl.width();
        	if (e.pageX < _left || e.pageX > _left + _width) {
        		return hideSubmenu();
        	}
        }
    });
    $(window).on('resize', setPaddingLeft);
    $(document.body).on('click', function(e) {
        if (!$.contains(subMenuEl, $(e.target)) && !$.contains(menuEl, $(e.target))) {
        	return hideSubmenu();
        }
    });
    return $('#J_Menu li').on('singleTap', function(e) {
        if ($(this).hasClass('selected')) {
        	return hideSubmenu();
        }
    });

}

