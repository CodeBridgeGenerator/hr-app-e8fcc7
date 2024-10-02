import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import JobClassifiedPage from "../JobClassifiedPage/JobClassifiedPage";

const SingleEmployeeDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("employeeDetails")
            .get(urlParams.singleEmployeeDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "EmployeeDetails", type: "error", message: error.message || "Failed get employeeDetails" });
            });
    }, [props,urlParams.singleEmployeeDetailsId]);


    const goBack = () => {
        navigate("/employeeDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">EmployeeDetails</h3>
                </div>
                <p>employeeDetails/{urlParams.singleEmployeeDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Age</label><p className="m-0 ml-3" >{Number(_entity?.age)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Department</label><p className="m-0 ml-3" >{_entity?.department}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">No. of Year Service</label><p className="m-0 ml-3" >{Number(_entity?.yearOfService)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Job Title</label><p className="m-0 ml-3" >{_entity?.jobTitle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Skills</label><p className="m-0 ml-3" >{_entity?.skills}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <JobClassifiedPage/>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleEmployeeDetailsPage);
