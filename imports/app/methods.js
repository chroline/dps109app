const updateView = async (type, el) => {
    this.setParams = async () => {
        return new Promise(async resolve => {
            if ($(el).data("teacher") !== undefined) {
                await Meteor.call("getTeacher", $(el).data("teacher"), function(
                    e,
                    r
                ) {
                    resolve(r.fields);
                });
            } else if($(el).data("back") !== undefined) {
                resolve({
                    prev: true
                })
            }
        });
    };

    const params = await this.setParams();

    this.page = () => {
        console.log(params);
        return new Promise(resolve => {
            let page;
            switch (type) {
                case "teacher":
                    page = {
                        name: "Teacher",
                        params
                    };
                    resolve(page);
                    break;
                case "home":
                    params.prev = true;
                    page = {
                        name: "Home",
                        params
                    };
                    resolve(page);
                    break;
                case "back":
                    breadcrumbs.pop();
                    page = breadcrumbs[breadcrumbs.length - 1];
                    page.params.prev = true;
                    resolve(page);
                default:
                    resolve(page);
                    break;
            }
        });
    };
    var currentPage = await this.page();
    router.push(currentPage);
    barUpdate(currentPage.name);
    breadcrumbs[breadcrumbs.length] = currentPage;
};

const pageType = type => {
    return new Promise(resolve => {
        switch (type) {
            case "teacher":
                break;
        }
    });
};

export default {
    updateView
};
