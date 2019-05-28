import Airtable from "airtable";

const teacherBase = new Airtable({ apiKey: "key3zVNJMO5ooi70U" }).base(
    "appVvaAvbskgXqsO6"
);

const Teachers = () => {
    const Walden = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("Walden")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            console.log(list)
                            resolve(list);
                        }
                    });
                });
        });
    };
    const Wilmot = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("Wilmot")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            resolve(list);
                        }
                    });
                });
        });
    };
    const Kipling = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("Kipling")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            resolve(list);
                        }
                    });
                });
        });
    };
    const SouthPark = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("South Park")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            resolve(list);
                        }
                    });
                });
        });
    };
    const Shepard = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("Shepard")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            resolve(list);
                        }
                    });
                });
        });
    };
    const Caruso = async() => {
        let list = [];
        return new Promise(resolve => {
            teacherBase("Caruso")
                .select({
                    view: "Grid view"
                })
                .eachPage(function page(records) {
                    // This function (`page`) will get called for each page of records.

                    records.forEach(function(record) {
                        list[list.length] = record;
                        if (list.length === records.length) {
                            resolve(list);
                        }
                    });
                });
        });
    };
    return {
        Walden: Walden,
        Wilmot: Wilmot,
        Kipling: Kipling,
        "South Park": SouthPark,
        Shepard: Shepard,
        Caruso: Caruso,
        getTeacher: async(id, school) => {
            alert();
            return new Promise((resolve, reject) => {
                teacherBase(school).find(id, function(err, record) {
                    if (err) {
                        reject(err);
                    }
                    console.log(record);
                    resolve(record);
                });
            });
        }
    };
};

const Schools = {
    Walden: {
        phone: "847-945-9660",
        address: "630 Essex Court\nDeerfield, IL 60015"
    },
    Wilmot: {
        phone: "847-945-1075",
        address: "795 Wilmot Road\nDeerfield, IL 60015"
    },
    Kipling: {
        phone: "847-948-5151",
        address: "700 Kipling Place\nDeerfield, IL 60015"
    },
    "South Park": {
        phone: "847-945-5895",
        address: "1421 Hackberry Road\nDeerfield, IL 60015"
    },
    Shepard: {
        phone: "847-948-0620",
        address: "440 Grove Place\nDeerfield, IL 60015"
    },
    Caruso: {
        phone: "847-945-8430",
        address: "1801 Montgomery Road\nDeerfield, IL 60015"
    }
};

const Colors = {
    Walden: "red",
    Wilmot: "blue",
    Kipling: "red",
    "South Park": "blue",
    Shepard: "red",
    Caruso: "blue",
    'Report an Absence': "orange",
    "Tip Line": "green",
    "For Parents": "purple",
    "Health Info": "Red"
};

export { Teachers, Schools, Colors };