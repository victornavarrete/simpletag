
var tag = function(){ 
			
		var t = function(tag ,attrs, events ){
			/* format vars */
			tag = (tag.length>0)?tag:'div';
			attrs = "undefined"!==typeof attrs?attrs:{}; 
			events = "undefined"!==typeof events?events:{}; 
			
			var matched = tag.split(" ");
			tag = matched[0];
			matched.shift(); 
			
			/* create element */
			var el = document.createElement(tag);
			
			/* set atributes class and id */ 
			for(var c in matched) {
				var att  = matched[c];
				var val = att.substring(1,att.length);
				if(att[0]=='.') {
					if(attrs['class']==undefined) {
						attrs['class'] = val;
					}else{
						attrs['class'] = attrs['class']+' '+val;
					}
				} else if(att[0]=='#') {
					if(attrs['id']==undefined) {
						attrs['id'] = val;
					}
				}
			} 
			 
			/* add inner content  */
			var e = attrs.content; 
			
			var blocked = new Array("img", "input", "br", "hr");
			if(blocked.indexOf(tag) == -1) {
				switch(typeof e) {
					case 'object':
						if(e instanceof Array){ 
							for (i=0;i<e.length;i++){
								if("object"==typeof e[i]){ 
									el.appendChild(e[i]); 
								}else{ 
									el.innerHTML = e[i];
								}
							} 
						}else{
							el.appendChild(e);
						}
					break; 
					case 'string': 
						el.innerHTML = e;
					break;
				} 
			} 
			delete attrs.content;
			 
			/* add atributes to element */
			for(var a in attrs){
			  if (attrs.hasOwnProperty(a)) {
				el.setAttribute(a, attrs[a]);
			  }
			}
			
			  
			/* add events to element */
			for(var d in events) {
			  if (events.hasOwnProperty(d)) { 
				  if (document.addEventListener){ 
						el.addEventListener(d, events[d],false);
					}else{ 
						el.attachEvent('on'+d, events[d]); 
					}  
			  }
			}
			
			
			/* return and clear trash */
			try{
				return el;
			}finally{
				e, el, a, c, d, tag, attrs, att, val, matched, blocked = null;
			}
		};
		
		t.create = t;
		 
		t.div	 = function(a,b){ return this.create("div",a,b); };
		t.img	 = function(a,b){ return this.create("img",a,b); };
		t.span	 = function(a,b){ return this.create("span",a,b); };
		t.a		 = function(a,b){ return this.create("a",a,b); };
		t.p		 = function(a,b){ return this.create("p",a,b); };
		t.button = function(a,b){ return this.create("button",a,b); }; 
		t.input	 = function(a,b){ return this.create("input",a,b); }; 
		
	return t;
	
}();