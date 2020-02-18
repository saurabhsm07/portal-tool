
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
    }


}
