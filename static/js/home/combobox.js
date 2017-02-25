update_holder = $("#dropdown-menu");
update_holder.empty();
$.getJSON("/combobox/",
	function(data){
        	jQuery.each(data, function(){
                update_holder.prepend('<li>'
                    + '<a href="/'+this.fields.metadata_url+'/">'
					+ this.fields.metadata_name
					+ '</a>'
                    + '</li>'
                );
            });
        }
    );

