iD.ui.Sidebar = function(context) {
    var inspector = iD.ui.Inspector(context),
        noticeSelect = iD.ui.NoticeSelect(context),
        current;

    function sidebar(selection) {
        // var featureListWrap = selection.append('div')
        //     .attr('class', 'feature-list-pane')
        //     .call(iD.ui.FeatureList(context));

        selection.call(iD.ui.Notice(context));

        selection.call(noticeSelect);

        var inspectorWrap = selection.append('div')
            .attr('class', 'inspector-hidden inspector-wrap fr');

        sidebar.hover = function(id) {
            if (!current && id) {
                // featureListWrap.classed('inspector-hidden', true);
                noticeSelect.hide();
                inspectorWrap.classed('inspector-hidden', false)
                    .classed('inspector-hover', true);

                if (inspector.entityID() !== id || inspector.state() !== 'hover') {
                    inspector
                        .state('hover')
                        .entityID(id);

                    inspectorWrap.call(inspector);
                }
            } else if (!current) {
                // featureListWrap.classed('inspector-hidden', false);
                noticeSelect.show();
                inspectorWrap.classed('inspector-hidden', true);
                inspector.state('hide');
            }
        };

        sidebar.hover = _.throttle(sidebar.hover, 200);

        sidebar.select = function(id, newFeature) {
            if (!current && id) {
                // featureListWrap.classed('inspector-hidden', true);
                noticeSelect.forceHide();
                inspectorWrap.classed('inspector-hidden', false)
                    .classed('inspector-hover', false);

                if (inspector.entityID() !== id || inspector.state() !== 'select') {
                    inspector
                        .state('select')
                        .entityID(id)
                        .newFeature(newFeature);

                    inspectorWrap.call(inspector);
                }
            } else if (!current) {
                // featureListWrap.classed('inspector-hidden', false);
                noticeSelect.show();
                inspectorWrap.classed('inspector-hidden', true);
                inspector.state('hide');
            }
        };

        sidebar.show = function(component) {
            // featureListWrap.classed('inspector-hidden', true);
            noticeSelect.hide();
            inspectorWrap.classed('inspector-hidden', true);
            if (current) current.remove();
            current = selection.append('div')
                .attr('class', 'sidebar-component')
                .call(component);
        };

        sidebar.hide = function() {
            // featureListWrap.classed('inspector-hidden', false);
            noticeSelect.show();
            inspectorWrap.classed('inspector-hidden', true);
            if (current) current.remove();
            current = null;
        };
    }

    sidebar.hover = function() {};
    sidebar.select = function() {};
    sidebar.show = function() {};
    sidebar.hide = function() {};

    return sidebar;
};
