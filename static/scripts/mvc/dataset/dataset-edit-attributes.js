define(["utils/utils","mvc/ui/ui-tabs","mvc/ui/ui-misc","mvc/form/form-view"],function(a,b,c,d){var e=Backbone.View.extend({initialize:function(a){this.setElement("<div/>"),this.render(a)},render:function(b){var c=Galaxy.root+"dataset/edit",d=this;a.get({url:c,data:{dataset_id:b},success:function(a){d.render_attribute_page(d,a)},error:function(){var a={status:"error",message:"Error occured while loading the dataset."};d.display_message(d,a,d.$el.find(".edit-attr"))}})},render_attribute_page:function(a,b){var c=null;a.$el.empty().append(a._templateHeader()),c=a.$el.find(".edit-attr"),a.display_message(a,b,c),a.create_tabs(a,b,c)},call_ajax:function(a,b){var c=Galaxy.root+"dataset/edit";$.ajax({type:"PUT",url:c,data:b,success:function(b){a.render_attribute_page(a,b),a.reload_history()},error:function(){var b={status:"error",message:"Error occured while saving. Please fill all the required fields and try again."};a.display_message(a,b,a.$el.find(".edit-attr"))}})},display_message:function(a,b,c){$el_message=c.find(".response-message"),$el_message.removeClass("errormessage donemessage warningmessage"),b.message&&null!==b.message&&""!==b.message?($el_message.addClass(b.status+"message"),$el_message.html("<p>"+_.escape(b.message)+"</p>")):$el_message.html("")},create_tabs:function(a,c,d){a.tabs=new b.View,a.tabs.add({id:"attributes",title:"Attributes",icon:"fa fa-bars",tooltip:"Edit dataset attributes",$el:a._getAttributesFormTemplate(a,c)}),a.tabs.add({id:"convert",title:"Convert",icon:"fa-gear",tooltip:"Convert to new format",$el:a._getConvertFormTemplate(a,c)}),a.tabs.add({id:"datatype",title:"Datatypes",icon:"fa-database",tooltip:"Change data type",$el:a._getChangeDataTypeFormTemplate(a,c)}),a.tabs.add({id:"permissions",title:"Permissions",icon:"fa-user",tooltip:"Permissions",$el:a._getPermissionsFormTemplate(a,c)}),d.append(a.tabs.$el),a.tabs.showTab("attributes")},_templateHeader:function(){return'<div class="page-container edit-attr"><div class="response-message"></div><h3>Edit Dataset Attributes and Permissions</h3></div>'},_getAttributesFormTemplate:function(a,b){var e=new d({title:"Edit Attributes",inputs:b.edit_attributes_inputs,operations:{submit_editattr:new c.ButtonIcon({tooltip:"Save attributes of the dataset",icon:"fa-floppy-o ",title:"Save Attributes",onclick:function(){a._submit(a,e,b,"edit_attributes")}}),submit_autocorrect:new c.ButtonIcon({tooltip:"This will inspect the dataset and attempt to correct the above column values if they are not accurate.",icon:"fa-undo ",title:"Auto-detect",onclick:function(){a._submit(a,e,b,"auto-detect")}})}});return e.$el},_getConvertFormTemplate:function(a,b){var e=new d({title:"Convert to new format",inputs:b.convert_inputs,operations:{submit:new c.ButtonIcon({tooltip:"Convert the datatype to a new format",title:"Convert Datatype",icon:"fa-exchange ",onclick:function(){a._submit(a,e,b,"convert")}})}});return e.$el},_getChangeDataTypeFormTemplate:function(a,b){var e=new d({title:"Change data type",inputs:b.convert_datatype_inputs,operations:{submit:new c.ButtonIcon({tooltip:"Change the datatype to a new type",title:"Change Datatype",icon:"fa-exchange ",onclick:function(){a._submit(a,e,b,"change")}})}});return e.$el},_getPermissionsFormTemplate:function(a,b){if(b.can_manage_dataset){var e=new d({title:"Manage dataset permissions on "+b.display_name,inputs:b.permission_inputs,operations:{submit:new c.ButtonIcon({tooltip:"Save Permissions",title:"Save Permissions",icon:"fa-floppy-o ",onclick:function(){a._submit(a,e,b,"permissions")}})}});return e.$el}var e=new d({title:"View Permissions",inputs:b.permission_inputs});return e.$el},_submit:function(a,b,c,d){var e=b.data.create();switch(e.dataset_id=c.dataset_id,d){case"edit_attributes":e.save="Save";break;case"auto-detect":e.detect="Auto-detect";break;case"convert":null!==e.target_type&&e.target_type&&(e.dataset_id=c.dataset_id,e.convert_data="Convert");break;case"change":e.change="Save";break;case"permissions":var f={};f.permissions=JSON.stringify(e),f.update_roles_button="Save",f.dataset_id=c.dataset_id,e=f}a.call_ajax(a,e)},reload_history:function(){window.Galaxy&&window.Galaxy.currHistoryPanel.loadCurrentHistory()}});return{View:e}});
//# sourceMappingURL=../../../maps/mvc/dataset/dataset-edit-attributes.js.map