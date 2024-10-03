"user client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddSkill, removeSkill } from "@/redux/action/user";
import { Delete, Plus } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Skill = ({ user, btnLoading }) => {
  const [skill, setskill] = useState("");

  const dispatch = useDispatch();

  const addSkillHandler = () => {
    if (skill === "") return alert("Please give value");
    dispatch(AddSkill(skill));
  };

  const removeSkillHandler = (skill) => {
    if (confirm("Are you sure you want to remove this skill?"))
      dispatch(removeSkill(skill));
  };
  return (
    <div>
      <Card className="w-full shadow-sm mt-3 py-3 md:px-10 px-3">
        <div className="flex gap-8 flex-wrap items-center">
          <CardTitle>Skills</CardTitle>
          <Input
            type="text"
            placeholder="Add Skills"
            className="md:w-[30%]"
            value={skill}
            onChange={(e) => setskill(e.target.value)}
          />{" "}
          <Button disabled={btnLoading} onClick={addSkillHandler}>
            Add <Plus size={18} />
          </Button>
        </div>

        <CardContent className="mt-4">
          <div className="flex items-center gap-4 flex-wrap">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((e) => {
                return (
                  <p
                    key={e}
                    className="p-3 border border-gray-400 rounded-lg flex justify-center items-center gap-2"
                  >
                    {e}
                    <button
                      disabled={btnLoading}
                      className="w-8 h-8 text-red-600"
                    >
                      <Delete size={18} onClick={() => removeSkillHandler(e)} />
                    </button>
                  </p>
                );
              })
            ) : (
              <CardDescription>No Skills Yet.</CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skill;
