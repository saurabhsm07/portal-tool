module.exports = {


    saveCategoryObj: (category) => {

        return {
            url: 'http://localhost:4200/category/id/',
            html_url: 'http://localhost:5000/api/category/id',
            name: category.name,
            description: category.description,
            locale: 'en-us',
            position: 10,
            outdated: false,
            icon_url: category.icon_url,
            created_at: category.createdAt,
            updated_at: category.updatedAt,

        }
    },

    updateCategoryObj: (category) => {
        return {
            name: category.name,
            description: category.description,
            updated_at: category.updatedAt
        }
    }



}