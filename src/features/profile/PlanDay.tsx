import dayjs from "dayjs";
import {Plan} from "../../models/generatorModels.ts";
import {PlanRecipe} from "./PlanRecipe.tsx";

export const PlanDay = ({plan}: {plan: Plan}) => {
    return (
      <>
          {plan.plannedDays.map((day, dayIndex) => (
              <div key={dayIndex} className="plan-his-day">
                  <div className="date">
                      <p>{dayjs(day.date).format("DD.MM.YYYY")}</p>
                  </div>
                  <div className="main-relative-box planned-relative-box">
                      <div className="background-100-width"></div>
                      <div className="absolute-container">
                          <PlanRecipe day={day}/>
                      </div>
                      <div className="background-100-width planned-background"></div>
                  </div>
              </div>
          ))}
      </>
    );
}