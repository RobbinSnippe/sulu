define(function(){"use strict";var a={data:{},instanceName:"",newThumbnailSrc:"http://lorempixel.com/150/100/",newThumbnailTitel:""},b={datagridSelector:".datagrid-container",toolbarSelector:".list-toolbar-container",newFormSelector:"#collection-new"};return{view:!0,fullSize:{width:!0,keepPaddings:!0},header:{title:"media.collections.title",noBack:!0,breadcrumb:[{title:"navigation.media"},{title:"media.collections.title"}]},templates:["/admin/media/template/collection/new","/admin/media/template/collection/list"],initialize:function(){this.options=this.sandbox.util.extend(!0,{},a,this.options),this.sandbox.sulu.triggerDeleteSuccessLabel("labels.success.collection-deleted-desc"),this.bindCustomEvents(),this.render()},bindCustomEvents:function(){this.sandbox.on("sulu.list-toolbar.add",this.openOverlay.bind(this)),this.sandbox.on("husky.datagrid.item.click",this.navigateToCollection.bind(this))},addCollection:function(){if(!this.sandbox.form.validate(b.newFormSelector))return!1;var a=this.sandbox.form.getData(b.newFormSelector);this.sandbox.emit("sulu.media.collections.save-collection",a,function(a){this.sandbox.emit("husky.datagrid.record.add",a)}.bind(this))},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/media/template/collection/list")),this.initializeGrid(),this.initializeOverlay()},initializeGrid:function(){this.sandbox.start([{name:"datagrid@husky",options:{el:this.$find(b.datagridSelector),url:"/admin/api/collections",view:"group",pagination:!1,matchings:[{id:"title",type:"title"},{id:"mediaNumber",type:"count"},{id:"thumbnails",type:"thumbnails"}]}},{name:"list-toolbar@suluadmin",options:{el:this.$find(b.toolbarSelector),instanceName:this.options.instanceName,template:"defaultNoSettings",inHeader:!0}}])},initializeOverlay:function(){var a=this.sandbox.dom.createElement('<div class="overlay-element"/>');this.sandbox.dom.append(this.$el,a),this.$overlayContent=this.renderTemplate("/admin/media/template/collection/new"),this.sandbox.once("husky.overlay.add-collection.opened",function(){this.sandbox.start(b.newFormSelector),this.sandbox.form.create(b.newFormSelector)}.bind(this)),this.sandbox.start([{name:"overlay@husky",options:{el:a,title:this.sandbox.translate("sulu.media.add-collection"),instanceName:"add-collection",data:this.$overlayContent,okCallback:this.addCollection.bind(this)}}])},openOverlay:function(){this.sandbox.emit("husky.overlay.add-collection.open")},navigateToCollection:function(a){this.sandbox.emit("sulu.media.collections.collection-edit",a)}}});