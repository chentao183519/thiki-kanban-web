kanbanApp.factory('advancedFilterFactory', function() {
    var filter = {
        keyword: "",
        tags: { items: [], tagMatchType: 'or' },
        members: { items: [], memberMatchType: 'or' },
        size: -1
    };
    var board;
    return {
        getFilter: function() {
            return filter;
        },
        setFilter: function(_data) {
            filter = _data;
        },
        toggle: function() {
            filter.isOpenAdvanced = !filter.isOpenAdvanced;
        },
        closeAdvanced: function() {
            filter.isOpenAdvanced = false;
        },
        setBoard: function(_board) {
            board = _board;
        },
        getBoard: function() {
            return board;
        },
        addTag: function(_tag) {
            var index = filter.tags.items.indexOf(_tag.id);
            if (index > -1) {
                filter.tags.items.splice(index, 1);
                return;
            }
            filter.tags.items.push(_tag.id);
        },
        setKeyword: function(_keyword) {
            filter.keyword = _keyword;
        },
        setTagMatchType: function(_tagMatchType) {
            filter.tags.tagMatchType = _tagMatchType;
        },
        setMemberMatchType: function(_memberMatchType) {
            filter.members.memberMatchType = _memberMatchType;
        },
        addMember: function(_member) {
            var index = filter.members.items.indexOf(_member.userName);
            if (index > -1) {
                filter.members.items.splice(index, 1);
                return;
            }
            filter.members.items.push(_member.userName);
        },
        setSize: function(_size) {
            filter.size = _size;
        },
        resetSize: function() {
            filter.size = -1;
        }
    };
});