import Airtable from "airtable";

const teacherBase = new Airtable({ apiKey: "key3zVNJMO5ooi70U" }).base(
  "appVvaAvbskgXqsO6"
);

const Teachers = async () => {
  const Walden = async () => {
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
              resolve(list);
            }
          });
        });
    });
  };
  const Wilmot = async () => {
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
  const Kipling = async () => {
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
  const SouthPark = async () => {
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
  const Shepard = async () => {
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
  const Caruso = async () => {
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
  this["Walden"] = await Walden();
  this["Wilmot"] = await Wilmot();
  this["Kipling"] = await Kipling();
  this["South Park"] = await SouthPark();
  this["Shepard"] = await Shepard();
  this["Caruso"] = await Caruso();
  this.getTeacher = async (id, school) => {
    return new Promise((resolve, reject) => {
      teacherBase(school).find(id, function(err, record) {
        if (err) {
          reject(err);
        }
        resolve(record);
      });
    });
  };
};

const Schools = {
  'Walden': {
    phone: 1234,
    media: "/assets/imgs/schools/walden.jpg"
  },
  'Wilmot': {
    phone: 1234,
    media: "/assets/imgs/schools/wilmot.jpg"
  },
  'Kipling': {
    phone: 1234,
    media: "/assets/imgs/schools/kipling.jpg"
  },
  'South Park': {
    phone: 1234,
    media: "/assets/imgs/schools/southpark.jpg"
  },
  'Shepard': {
    phone: 1234,
    media: "/assets/imgs/schools/shepard.jpg"
  },
  'Caruso': {
    phone: 1234,
    media: "/assets/imgs/schools/caruso.jpg"
  },
}

export { Teachers, Schools };
