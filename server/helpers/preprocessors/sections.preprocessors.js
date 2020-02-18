module.exports = {

    saveSectionObj: (section) => {
        return {
            url: 'http://localhost:4200/sections/id',
            html_url: 'http://localhost:5000/api/section/',
            name: section.name,
            locale:'en-us',
            description: section.description,
            category_id: section.category_id,
            outdated: false,
            position: 10,
            parent_section_id: section.parent_section_id,
            created_at: section.created_at,
            updated_at: section.updated_at,
        }
    },

    updateSectionObj: (section) => {
        return {
            name: section.name,
            description: section.description,
            category_id: section.category_id,
            parent_section_id: section.parent_section_id,
            updated_at: section.updatedAt,
        }
    }
}