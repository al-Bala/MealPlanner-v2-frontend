import dayjs from "dayjs";
import {Plan} from "../../models/generatorModels.ts";
import {PlanRecipe} from "./PlanRecipe.tsx";

export const PlanDay = ({plan}: {plan: Plan}) => {
    return (
      <>
          {plan.plannedDays.map((day, dayIndex) => (
              <div key={dayIndex} className="plan-day">
                  <p className="date">{dayjs(day.date).format("DD.MM.YYYY")}</p>
                  <div className="plan-recipe-list">
                      <PlanRecipe day={day}/>
                  </div>
              </div>
          ))}
      </>
    );
}