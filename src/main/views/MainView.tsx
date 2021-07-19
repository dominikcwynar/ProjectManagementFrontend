import React from "react";
import SideMenu from "../components/SideMenu";
import { ProjectsView } from "../../projects/views/ProjectsView";

export const MainView: React.FC = () => {
  return (
    <>
      <SideMenu></SideMenu>
      <ProjectsView></ProjectsView>
    </>
  );
};
