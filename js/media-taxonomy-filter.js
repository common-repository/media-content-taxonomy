(function(){
    /**
     * Create a new MediaLibraryTaxonomyFilter we later will instantiate
     */
    var MediaLibraryTaxonomyFilter = wp.media.view.AttachmentFilters.extend({
        id: 'media-attachment-taxonomy-filter',

        createFilters: function() {
            var filters = {};
            // Formats the 'terms' we've included via wp_localize_script()
            _.each( MediaLibraryTaxonomyFilterOptions.terms || {}, function( value, index ) {
                filters[ index ] = {
                    text: value.name,
                    props: {
                        // The WP_Query var for the taxonomy
                        media_content_category: value.slug,
                    }
                };
            });
            filters.all = {
                // Default label
                text:  'All categories',
                props: {
                    // The WP_Query var for the taxonomy
                    media_content_category: ''
                },
                priority: 10
            };
            this.filters = filters;
        }
    });
    /**
     * Extend and override wp.media.view.AttachmentsBrowser to include our new filter
     */
    var AttachmentsBrowser = wp.media.view.AttachmentsBrowser;
    wp.media.view.AttachmentsBrowser = wp.media.view.AttachmentsBrowser.extend({
        createToolbar: function() {
            // Make sure to load the original toolbar
            AttachmentsBrowser.prototype.createToolbar.call( this );
            this.toolbar.set( 'MediaLibraryTaxonomyFilter', new MediaLibraryTaxonomyFilter({
                controller: this.controller,
                model:      this.collection.props,
                priority: -75
            }).render() );
        }
    });
})()