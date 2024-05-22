import React from "react";
import ManageQuestionPage from "../manage-question-page/ManageQuestionPage";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import useApiGet from "../../hooks/api/useApiGet";

const ManageQuestionTab = () => {
  const { get } = useQuestionReq();

  const { data: questionsList } = useApiGet(
    "questions",
    () => get("/trimmed"),
    {
      retry: 3,
    }
  );

  console.log(questionsList);
  return (
    <div>
      {questionsList &&
        questionsList.map((q, i) => {
          return (
            <p>
              {i + 1}) {q.question?.text}
              <ul>
                {q.choices?.map((c) => (
                  <li>
                    {c.value.text} {c.isCorrect ? "*" : ""}
                  </li>
                ))}
              </ul>
              <br />
            </p>
          );
        })}
    </div>
  );
};

export default ManageQuestionTab;
