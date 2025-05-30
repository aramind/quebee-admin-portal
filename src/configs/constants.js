const constants = {
  DEFAULT_PASSWORD: "1234",
  ROLES: ["admin", "editor", "viewer", ""],
  STATUS: ["active", "deactivated", ""],
  DATABASES: ["Engineering", "LET", "Accountancy", "Others"],
  DIFFICULTY: ["1", "2", "3", "4", "5"],
  TYPE: [
    { key: "mcq", value: "MCQ" },
    { key: "tf", value: "T/F" },
    { key: "others", value: "Others" },
  ],

  QUESTION_TYPE: [
    { value: "ob", label: "Objective" },
    { value: "ps", label: "Prob. Solving" },
  ],

  NATURE: [
    { key: "obj", value: "Objective-type" },
    { key: "ps", value: "Problem-solving" },
    { key: "others", value: "Others" },
  ],

  IS_HIDDEN: [
    { value: true, label: "yes" },
    { value: false, label: "no" },
  ],
  ACCESS: [
    { value: 1, label: "public" },
    { value: 2, label: "basic" },
    { value: 3, label: "premium" },
    { value: 4, label: "special" },
    { value: 5, label: "admin" },
  ],

  //
  difficultySliderConstants: {
    MIN_DIFFICULTY: 1,
    MAX_DIFFICULTY: 5,
    STEP_DIFFICULTY: 1,
    MARKS_DIFFICULTY: [
      {
        value: 1,
        label: "easy",
      },
      {
        value: 2,
        label: "intermediate",
      },
      {
        value: 3,
        label: "moderate",
      },
      {
        value: 4,
        label: "challenging",
      },
      {
        value: 5,
        label: "advanced",
      },
    ],
  },

  AVAILABILITY_CONTROLS_STATUSES: ["pending", "live", "deleted"],
  API_URL: {
    ROOT: `${process.env.REACT_APP_API_URL}/v1`,
    QUESTION: `${process.env.REACT_APP_API_URL}/v1/questions`,
    USER: `${process.env.REACT_APP_API_URL}/v1/employees`,
    TOPIC: `${process.env.REACT_APP_API_URL}/v1/courses/topics`,
    SUBJECT: `${process.env.REACT_APP_API_URL}/v1/courses/subjects`,
    EMPLOYEE: `${process.env.REACT_APP_API_URL}/v1/employees`,
    COURSE: `${process.env.REACT_APP_API_URL}/v1/courses`,
  },
};
export default constants;
