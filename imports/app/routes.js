import Home from "../pages/Home.vue";
import Teacher from "../pages/Teacher.vue";
import School from "../pages/School.vue";
import Directory from "../pages/Directory.vue";

import absence from "../pages/other/absence.vue";
import tipline from "../pages/other/tipline.vue";
import parents from "../pages/other/parents.vue";
import health from "../pages/other/absence.vue";

export default [{
        path: "/",
        component: Home,
        name: "Home",
        meta: { transitionName: `slide` }
    },
    {
        path: "/teacher",
        component: Teacher,
        name: "Teacher",
        meta: { transitionName: `slide` }
    },
    {
        path: "/school",
        component: School,
        name: "School",
        meta: {
            transitionName: `slide`
        }
    },
    {
        path: "/directory",
        component: Directory,
        name: "Directory",
        meta: {
            transitionName: `slide`
        }
    },
    {
        path: "/absence",
        component: absence,
        name: "Report_an_Absence",
        meta: {
            transitionName: `slide`
        }
    },
    {
        path: "/tipline",
        component: tipline,
        name: "Tip_Line",
        meta: {
            transitionName: `slide`
        }
    },
    {
        path: "/parents",
        component: parents,
        name: "For_Parents",
        meta: {
            transitionName: `slide`
        }
    },
    {
        path: "/health",
        component: health,
        name: "Health_Information",
        meta: {
            transitionName: `slide`
        }
    }
];