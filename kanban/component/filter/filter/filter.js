/**
 * Created by xubt on 16/02/2017.
 */
kanbanApp.filter('cardsFilter', ["$filter", function ($filter) {
    return function (_cards, _filter) {
        if (_filter === undefined || Object.keys(_filter).length === 0) {
            return _cards;
        }
        var filtered = [];
        for (var index in _cards) {
            var card = _cards[index];
            if (_filter !== "") {
                if (card.summary.indexOf(_filter.keyword) == -1 && (card.code === undefined || card.code === "")) {
                    continue;
                }
                if (card.summary.indexOf(_filter.keyword) == -1 && (card.code !== undefined && card.code.indexOf(_filter.keyword) == -1)) {
                    continue;
                }
            }
            if (_filter.tags !== undefined && _filter.tags.items !== undefined && _filter.tags.items.length > 0) {
                var isHaveTags = false;
                var matchedTagsCount = 0;
                for (var itemIndex in _filter.tags.items) {
                    for (var tagIndex in card.tagsNode.cardTags) {
                        if (card.tagsNode.cardTags[tagIndex].tagId === _filter.tags.items[itemIndex]) {
                            isHaveTags = true;
                            matchedTagsCount++;
                        }
                    }
                }
                if (_filter.tags.tagMatchType === 'and' && _filter.tags.items.length > matchedTagsCount) {
                    continue;
                }
                if (!isHaveTags) {
                    continue;
                }
            }
            if (_filter.members !== undefined && _filter.members.items !== undefined && _filter.members.items.length > 0) {
                var isHaveMembers = false;
                var matchedAssignees = [];
                for (var memberIndex in _filter.members.items) {
                    for (var assignmentIndex in card.assignmentsNode.assignments) {
                        if (matchedAssignees.indexOf(card.assignmentsNode.assignments[assignmentIndex].assignee) > -1) {
                            continue;
                        }
                        if (card.assignmentsNode.assignments[assignmentIndex].assignee === _filter.members.items[memberIndex]) {
                            isHaveMembers = true;
                            matchedAssignees.push(card.assignmentsNode.assignments[assignmentIndex].assignee);
                        }
                    }
                }
                if (_filter.members.memberMatchType === 'and' && _filter.members.items.length > matchedAssignees.length) {
                    continue;
                }
                if (!isHaveMembers) {
                    continue;
                }
            }
            if (_filter.size > -1) {
                if (_filter.size === 0 && (card.size !== undefined)) {
                    continue;
                }
                if (_filter.size > 0 && _filter.size !== card.size) {
                    continue;
                }
            }
            if (_filter.elapsedDays > -1) {
                if (card.elapsedDays === 0 || card.elapsedDays > _filter.elapsedDays) {
                    continue;
                }
            }
            if (card.parentId !== undefined) {
                continue;
            }
            filtered.push(card);
        }
        filtered = $filter('orderBy')(filtered, ['sortNumber', 'creationTime'], false);
        return filtered;
    };
}]);