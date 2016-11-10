/**
 * <p>Title: NickLee.Web.UI</p>
 * <p>Description: NickLee.Web.UI</p>
 * <p>Copyright: 1982-2005 by NickLee</p>
 * <p>Company: NickLee Corporation</p>
 * <p>CreateTime: 2004-07-01 08:30</p>
 * <p>ModifyTime: 2005-07-01 16:00</p>
 * @CreateAuthor Nick.Lee    * @version 1.0
 * @ModifyAuthor Nick.Lee    * @version 1.0
 */
BBDN.core.BusyBox = function (	id, 
								title, 
								text,
								width, 
								height,
								imageUrl, 
								layout,
								overlay,
								immediatelyOverlay, 
								keepOverlay, 
								overlayColor, 
								overlayOpacity,
								opacity,
								borderWidth,
								borderColor,
								borderStyle,
								backColor,					
								textWeight,
								textStyle,
								textSize,
								textFamily,
								titleWeight,
								titleStyle,
								titleSize,
								titleFamily,
								textColor,
								titleColor,
								fadeInDuration,
								fadeInEasing,
								fadeOnMouseOver,
								fadeOnMouseOverOpacity,
								position,
								keepPosition,
								slideDuration,
								slideEasing,
								roundCorners,
								showOnLoad,
								anchorControlID,
								dockPosition
							)
{
	var self = this;

	this.ID = id;
	this.Title = title;
	this.Text = text;
	
	if(width !== "")
		this.Width = width;
	else
		this.Width = "300px";
		
	if(height !== "")
		this.Height = height;
	else
		this.Height = "60px";
		
	this.ImageUrl = imageUrl;
	this.Layout = layout;
	this.Overlay = overlay;
	this.ImmediatelyOverlay = immediatelyOverlay;
	this.KeepOverlay = keepOverlay;
	
	// if overlaycolor not specified  set the actual body background color
	// no transparent background allowed
    if(overlayColor === "")
    {
		if(document.body.currentStyle)
			this.OverlayColor = document.body.currentStyle.backgroundColor;
        
		if(document.defaultView)
			this.OverlayColor = document.defaultView.getComputedStyle(document.body, "").getPropertyValue("background-color");
    
		// if body background color is not specified make it white
		if(this.OverlayColor == "transparent")
			this.OverlayColor = "#fff";
    }    
    else
    {
		this.OverlayColor = overlayColor;
	}
	this.OverlayOpacity = overlayOpacity;
	this.Opacity = opacity;
	
	if(borderWidth !== "")
		this.BorderWidth = borderWidth;
	else
		this.BorderWidth = "1px";
	
	if(borderColor !== "")
		this.BorderColor = borderColor;
	else
		this.BorderColor = "black";

	if(borderStyle !== "NotSet")
		this.BorderStyle = borderStyle;
	else
		this.BorderStyle = "solid";
			
	if(backColor === "")
		this.BackColor = "#ffffff";
	else
		this.BackColor = backColor;
	
	this.TextWeight = textWeight;
	this.TextStyle = textStyle;
	this.TextSize =	textSize;
	this.TextFamily = textFamily;
	this.TitleWeight = titleWeight;
	this.TitleStyle = titleStyle;
	this.TitleSize = titleSize;
	this.TitleFamily = titleFamily;	
	
	if(textColor !== "")
		this.TextColor = textColor;
	else
		this.TextColor = "black";
	
	if(titleColor !== "")
		this.TitleColor = titleColor;
	else
		this.TitleColor = "black";
	
	this.FadeInDuration = fadeInDuration;
	
	this.FadeOnMouseOver = fadeOnMouseOver;
	this.FadeOnMouseOverOpacity = fadeOnMouseOverOpacity;
	
	this.FinishedFading = false;
	this.Visible = false;
	
	this.Position = position;
	this.KeepPosition = keepPosition;
	
	this.SlideDuration = slideDuration;
	
	this.SlideEasing = BBDN.util.Yahoo.getEasingFromString(slideEasing);
	this.FadeInEasing = BBDN.util.Yahoo.getEasingFromString(fadeInEasing);
	
	// not working yet
	this.RoundCorners = roundCorners;
	
	this.ShowOnLoad = showOnLoad;
	
	this.AnchorControlID = anchorControlID;
	this.DockPosition = dockPosition;
	
	//
	// Privileged members
	//
	
	this.Show = function()
	{	
		// if validators don't validate return and don't show the box
		if(!BBDN.util.Dom.checkValidators())
			return;
			
		// not null only if ShowOnLoad is true
		this.container = BBDN.util.Dom.$(this.ID + "Container");
		
		// create and show the box
		create();	
		
   		BBDN.util.Dom.hideSelects();       
		
		// subscribe events to keep the box positioned
		if(this.KeepPosition && this.Position !== "dock")
		{
			YAHOO.util.Event.addListener(window, "resize", slideToPosition, this, true);
			YAHOO.util.Event.addListener(window, "scroll", slideToPosition, this, true);
			YAHOO.util.Event.addListener(window, "DOMMouseScroll", slideToPosition, this, true);
		}
		
		if(this.Overlay && !this.ImmediatelyOverlay && !this.ShowOnLoad)
		{
			this.CreateOverlay(); 
		}
			
		if(this.FadeOnMouseOver)
		{		
			YAHOO.util.Event.addListener(this.box, "mouseover", makeTransparent, this, true);
			YAHOO.util.Event.addListener(this.box, "mouseout", resetTransparency, this, true);
		}
	}; // end Show
	
	this.Close = function()
	{	
		if(this.Overlay && !this.KeepOverlay && !this.ShowOnLoad)
		{
			// Remove Overlay
			var overlay = BBDN.util.Dom.$(this.ID + "Overlay");
			
			if(overlay !== null)
				document.body.removeChild(overlay);
		}
		
		this.Visible = false;
	    		
		if(this.box !== null)
		{	    			
			if(this.ShowOnLoad)
			{
				this.container.removeChild(this.box);
				window.clearInterval(this.hideSelectsTimer);
				BBDN.util.Dom.showSelects(); 
			}
			else
				document.body.removeChild(this.box);
		}
		
		BBDN.util.Dom.showSelects();
	}; // end Close
	
	this.CreateOverlay = function()
	{
		var d = document;	
		var overlay = d.createElement("div");
	     		
		document.body.appendChild(overlay);
	    
		overlay.id = this.ID + "Overlay";
	    
		overlay.style.position = "absolute";  
		//overlay.style.display = "block";  
			
		overlay.style.top = "0px";
		overlay.style.left = "0px";
				
		overlay.style.zIndex = "9998";
	    
		overlay.style.width = BBDN.util.Dom.getTotalWidth() + "px";
		overlay.style.height = BBDN.util.Dom.getTotalHeight() + "px";
		  
		if(BBDN.util.BrowserSniff.is_opera)
		{
			// adjust this
			overlay.style.backgroundImage = "url(BusyBoxDotNet.axd?res=maskBG.png)"; 
			overlay.style.backgroundRepeat = "repeat";
		}
		else
		{
			var mBrowser=BBDN.util.uaMatchBrowser;
			if(mBrowser.browser=="msie" && mBrowser.version=="8.0")
			{
//				overlay.style.backgroundColor = "transparent";
				var OverlayOpacityOX=parseInt((this.OverlayOpacity/100)*255).toString(16);
				var mOverlayColor=this.OverlayColor.replace("#","#"+OverlayOpacityOX);
				overlay.style.filter ="progid:DXImageTransform.Microsoft.gradient(startColorstr="+mOverlayColor+",endColorstr="+mOverlayColor+")";
			}
			else
			{
				overlay.style.backgroundColor = this.OverlayColor;
			}
			BBDN.util.Dom.setOpacity(overlay, this.OverlayOpacity);  
		}
	}; // end CreateOverlay
	
	//
	// Private members
	//
	
	function create()
	{    
		// should never happen to find an instance of the box
		if(BBDN.util.Dom.$(self.ID))
			self.Close();
	    
		// create the div element
		self.box = document.createElement("div");
		
		if(self.ShowOnLoad)
		{
			// append the box to the container
			self.container.appendChild(self.box);
			// needed to hide selects eventually rendered during page load at intervals
			self.hideSelectsTimer = window.setInterval(BBDN.util.Dom.hideSelects, 100); 
		}
		else
			// append the box to the body
			document.body.appendChild(self.box);		
		
		// set element attributes
		self.box.style.display = "none"; 
		self.box.id = self.ID; 
		self.box.style.position = "absolute";
		self.box.style.zIndex = "9999";
				
		self.box.style.borderWidth = self.BorderWidth;
		self.box.style.borderColor = self.BorderColor;		
		self.box.style.borderStyle = self.BorderStyle;
		self.box.style.backgroundColor = self.BackColor;
		
		// set the chosen template
		setTemplate();		
		
		self.box.style.display = "block"; 
				
		self.Visible = true;
		
		/*if(self.RoundCorners)
			Rico.Corner.round(self.ID);*/
		
		// set position for the first time (then will subscribe scroll and resize events)
		setPosition();
		
		// fade in if the case or just set the final opacity
		fadeIn();	
	} // end create
	
	function setPosition()
	{
		if(self.Visible)
		{			
			var fullHeight = BBDN.util.Dom.getInnerHeight();
			var fullWidth = BBDN.util.Dom.getInnerWidth();
			
			var scTop = document.documentElement.scrollTop ? 
				document.documentElement.scrollTop : document.body.scrollTop;
				
			var scrollTop = parseInt(scTop,10);
			
			var scLeft = document.documentElement.scrollLeft ? 
				document.documentElement.scrollLeft : document.body.scrollLeft;
				
			var scrollLeft = parseInt(scLeft,10);
				
			/*	original (the new above method should work even if the document is not xhtml)
			IT DOESNT WORK EITHER IF DOCTYPE IS NOT XHTML
				
			var scrollTop = parseInt(document.documentElement.scrollTop,10);
			var scrollLeft = parseInt(document.documentElement.scrollLeft,10);*/
			
			if(self.ShowOnLoad)
			{
				scrollTop = scrollTop - BBDN.util.Dom.getAbsoluteTop(self.container.offsetParent);
				scrollLeft = scrollLeft - BBDN.util.Dom.getAbsoluteLeft(self.container.offsetParent);
			}
			
			switch(self.Position)
			{
				case "center": 
				
					self.box.style.top = (scrollTop  + ((fullHeight - self.box.offsetHeight) / 2)) + "px";
					self.box.style.left =  (scrollLeft + ((fullWidth - self.box.offsetWidth) / 2)) + "px";
					break;
					
				case "righttop":
				
					self.box.style.top = (scrollTop + 10) + "px";
					self.box.style.left =  (scrollLeft + fullWidth - self.box.offsetWidth - 20) + "px";
					break;
					
				case "lefttop":
					
					self.box.style.top = (scrollTop + 10) + "px";
					self.box.style.left =  (scrollLeft + 10) + "px";
					break;
					
				case "leftbottom":
				
					self.box.style.top = (scrollTop + fullHeight - self.box.offsetHeight - 20) + "px";
					self.box.style.left = (scrollLeft + 10) + "px";
					break;

				case "rightbottom":
				
					self.box.style.top = (scrollTop + fullHeight - self.box.offsetHeight - 20) + "px";
					self.box.style.left =  (scrollLeft + fullWidth - self.box.offsetWidth - 20) + "px";
					break;
					
				case "dock":
				
					var size = BBDN.util.Dom.getElementSize(self.box);					
					var windowsize = BBDN.util.Dom.getElementSize(document.body);
					var parentelementposition = YAHOO.util.Dom.getXY(BBDN.util.Dom.$(self.AnchorControlID));
					var parentelementsize = BBDN.util.Dom.getElementSize(BBDN.util.Dom.$(self.AnchorControlID));
					
					if(self.DockPosition === "auto")	// find best position
					{
						if((windowsize.width - parentelementposition[0] - parentelementsize.width - size.width) > 0 && (parentelementposition[1] + parentelementsize.height / 2 - size.height / 2) > 0)
							self.DockPosition = "right";
						else if((parentelementposition[0] - size.width) > 0 && (parentelementposition[1] + parentelementsize.height / 2 - size.height / 2) > 0)
							self.DockPosition = "left";
						else if((parentelementposition[0] + parentelementsize.width / 2 - size.width / 2) > 0 && (parentelementposition[1] - size.height) > 0)
							self.DockPosition = "top";
						else
							self.DockPosition = "bottom";
					}
					
					switch(self.DockPosition)
					{
						case "right":
							self.box.style.left = parentelementposition[0] + parentelementsize.width + "px";
							self.box.style.top = parentelementposition[1] + parentelementsize.height / 2 - size.height / 2 + "px";
							
							break;
							
						case "left":
							self.box.style.left = parentelementposition[0] - size.width + "px";
							self.box.style.top = parentelementposition[1] + parentelementsize.height / 2 - size.height / 2 + "px";
							
							break;
							
						case "top":
							self.box.style.left = parentelementposition[0] + parentelementsize.width / 2 - size.width / 2 + "px";
							self.box.style.top = parentelementposition[1] - size.height + "px";
							
							break;
							
						case "bottom":
							self.box.style.left = parentelementposition[0] + parentelementsize.width / 2 - size.width / 2 + "px";
							self.box.style.top = parentelementposition[1] + parentelementsize.height + "px";
						
							break;
					} // end switch	
					
					break;
			} // end switch
		} // end if
	} // end setPosition

	function slideToPosition()
	{
		if(self.Visible)
		{	
			var fullHeight = BBDN.util.Dom.getInnerHeight();
			var fullWidth = BBDN.util.Dom.getInnerWidth();
			
			var scTop = document.documentElement.scrollTop ? 
				document.documentElement.scrollTop : document.body.scrollTop;
				
			var scrollTop = parseInt(scTop,10);
			
			var scLeft = document.documentElement.scrollLeft ? 
				document.documentElement.scrollLeft : document.body.scrollLeft;
				
			var scrollLeft = parseInt(scLeft,10);
			
			//if ShowOnLoad the box is in the container and to center it we need to calculate its absolute position
			if(self.ShowOnLoad)
			{
				scrollTop = scrollTop - BBDN.util.Dom.getAbsoluteTop(self.container.offsetParent);
				scrollLeft = scrollLeft - BBDN.util.Dom.getAbsoluteLeft(self.container.offsetParent);
			}
			
			var xPos, yPos;
						
			switch(self.Position)
			{
				case "center":		xPos = scrollLeft + ((fullWidth - self.box.offsetWidth) / 2);
									yPos = scrollTop + ((fullHeight - self.box.offsetHeight) / 2);
									break;
								
				case "righttop":	yPos = scrollTop + 10;
									xPos =  scrollLeft + fullWidth - self.box.offsetWidth - 20;
									break;	
				
				case "lefttop":		yPos = scrollTop + 10;
									xPos =  scrollLeft + 10;
									break;
									
				case "leftbottom": 	yPos = scrollTop + fullHeight - self.box.offsetHeight - 20;
									xPos = scrollLeft + 10;
									break;
									
				case "rightbottom": yPos = scrollTop + fullHeight - self.box.offsetHeight - 20;
									xPos = scrollLeft + fullWidth - self.box.offsetWidth - 20;
									break;				
			}
			
			var attributes = {
					top: { to: yPos },
					left: { to: xPos }
				};
								
			var anim = new YAHOO.util.Anim(self.ID, attributes, (self.SlideDuration / 1000), self.SlideEasing);
				
			anim.animate();
		}
	} // end slideToPosition

	function fadeIn()
	{
		if(self.Visible)
		{
			// actually fade in
			if(self.FadeInDuration > 0)
			{
				BBDN.util.Dom.setOpacity(self.box, 0);
				
				var attributes = { 
					opacity: { to: (self.Opacity / 100) } 
				};
				
				var anim = new YAHOO.util.Anim(self.ID, attributes, (self.FadeInDuration / 1000), self.FadeInEasing);
								
				anim.onComplete.subscribe(onFinishedFading, self, true);
				
				anim.animate();
			}
			// just show without fading
			else
			{
				BBDN.util.Dom.setOpacity(self.box, self.Opacity);
				self.FinishedFading = true;
			}
		}
	} // end fadeIn
	
	function onFinishedFading()
	{
		self.FinishedFading = true;
	}
	
	function makeTransparent()
	{		
		if(self.FinishedFading)
			BBDN.util.Dom.setOpacity(self.box, self.FadeOnMouseOverOpacity);
	}
	
	function resetTransparency()
	{
		if(self.FinishedFading)
			BBDN.util.Dom.setOpacity(self.box, self.Opacity);
	}
	
	function setTemplate()
	{
		var tableID = self.ID + "Table";
		var textID = self.ID + "Text";
		var titleID = self.ID + "Title";
		var imageID = self.ID + "Image";

		switch(self.Layout)
		{
			case "classic": 
			
					self.box.innerHTML = 
					"<table id=\"" + tableID + "\" border=0 cellpadding=0 cellspacing=0>" + 
					"	<tr valign=\"top\">" +
					"		<td rowspan=\"2\"><img border=\"0\" id=\"" + imageID + "\" src=\"" + self.ImageUrl + "\" /></td>" +
					"		<td width=\"100%\"><p id=\"" + titleID + "\">" + self.Title + "</p></td>" +
					"	</tr>" +
					"	<tr valign=\"top\">" +
					"		<td><p id=\"" + textID + "\">" + self.Text + "</p></td>" +
					"	</tr>" +
					"</table>"; 
					
					var table = BBDN.util.Dom.$(tableID);
		    
					table.style.width = self.Width;
					table.style.height = self.Height;
				    
					var title = BBDN.util.Dom.$(titleID);
				    
					title.style.fontWeight = self.TitleWeight;
					title.style.fontStyle = self.TitleStyle;
					title.style.fontSize = self.TitleSize;
					title.style.fontFamily = self.TitleFamily;
					title.style.margin = "15px 10px 0px 10px";
				    
					title.style.color = self.TitleColor;
				    
					var text = BBDN.util.Dom.$(textID);
				    
					text.style.fontWeight = self.TextWeight;
					text.style.fontStyle = self.TextStyle;
					text.style.fontSize = self.TextSize;
					text.style.fontFamily = self.TextFamily;
					text.style.margin = "20px 10px 15px 10px";
				    
					text.style.color = self.TextColor;
						
					var image = BBDN.util.Dom.$(imageID);
					
					image.style.margin = "15px 5px 10px 10px";
					
					break;
			
			case "classicbottomimage":
					
					self.box.innerHTML = 
					"<table id=\"" + tableID + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" + 
					"	<tr valign=\"top\">" +
					"		<td width=\"100%\"><p id=\"" + titleID + "\">" + self.Title + "</p></td>" +
					"	</tr>" +
					"	<tr valign=\"top\">" +
					"		<td><p id=\"" + textID + "\">" + self.Text + "</p></td>" +
					"	</tr>" +
					"	<tr valign=\"top\">" +
					"		<td align=\"center\"><img border=\"0\" id=\"" + imageID + "\" src=\"" + self.ImageUrl + "\" /></td>" +
					"	</tr>" +
					"</table>";
		            
					var table = BBDN.util.Dom.$(tableID);
				    
					table.style.width = self.Width;
					table.style.height = self.Height;
				    
					var title = BBDN.util.Dom.$(titleID);
				    
					title.style.fontWeight = self.TitleWeight;
					title.style.fontStyle = self.TitleStyle;
					title.style.fontSize = self.TitleSize;
					title.style.fontFamily = self.TitleFamily;
					title.style.margin = "15px 10px 0px 10px";
	   				title.style.color = self.TitleColor;
				    
					var text = BBDN.util.Dom.$(textID);
				    
					text.style.fontWeight = self.TextWeight;
					text.style.fontStyle = self.TextStyle;
					text.style.fontSize = self.TextSize;
					text.style.fontFamily = self.TextFamily;
					text.style.margin = "20px 10px 15px 10px";
					text.style.color = self.TextColor;
						
					var image = BBDN.util.Dom.$(imageID);
					
					image.style.margin = "0px 0px 10px 0px";
				
					break;
					
			case "imageonly":
					
					self.box.innerHTML = "<img border=\"0\" id=\"" + imageID + "\" src=\"" + self.ImageUrl + "\" />";
		            
					var image = BBDN.util.Dom.$(imageID);
					
					image.style.margin = "0px 0px 0px 0px";
				
					break;
					
			case "textonly":
			
					self.box.innerHTML = 
					
					"<span id=\"" + textID + "\">" + self.Text + "</span>";
					
					var text = BBDN.util.Dom.$(textID);
				    
					text.style.fontWeight = self.TextWeight;
					text.style.fontStyle = self.TextStyle;
					text.style.fontSize = self.TextSize;
					text.style.fontFamily = self.TextFamily;
					text.style.margin = "20px 10px 15px 10px";
				    
					text.style.color = self.TextColor;
						
					break;
		} // end switch
	} // end setTemplate
} // end BBDN.core.BusyBox