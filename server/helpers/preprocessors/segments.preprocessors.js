
module.exports = {

    /**
     * process
     */
    clientSegmentObj : (segment) => {

        if((segment.group_ids != null) && (segment.group_ids != '') && (segment.group_ids != 'null')){
            segment.group_ids = JSON.parse(segment.group_ids);
        }
        if((segment.organization_ids != null) && (segment.organization_ids != '')){
            segment.organization_ids = JSON.parse(segment.organization_ids);
        }
        if((segment.tags != null) && (segment.tags != '')){
            segment.tags = JSON.parse(segment.tags);
        }
        if((segment.or_tags != null) && (segment.or_tags != '')){
            segment.or_tags = JSON.parse(segment.or_tags);
        }
        
        return segment;
    },

    saveSegmentObj : (segment) => {
        return  {
            url: 'http://localhost:4200/segments/id',
            html_url: 'http://localhost:5000/api/segment/',
            name: segment.name,
            user_type: segment.user_type,
            group_ids: segment.group_ids,
            organization_ids: segment.organization_ids,
            tags: segment.tags,
            or_tags: segment.or_tags,
            created_at: segment.created_at,
            updated_at: segment.updated_at,
        }
    },

    updateSegmentObj : (segment) => {
        return {
            name: segment.name,
            user_type: segment.user_type,
            group_ids: segment.group_ids,
            organization_ids: segment.organization_ids,
            tags: segment.tags,
            or_tags: segment.or_tags,
            updated_at: segment.updated_at,
        }
    }


}
