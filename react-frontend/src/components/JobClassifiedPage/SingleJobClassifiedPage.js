import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleJobClassifiedPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [employeeName, setEmployeeName] = useState([]);
const [employeeInterest, setEmployeeInterest] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("jobClassified")
            .get(urlParams.singleJobClassifiedId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"employeeName","employeeInterest"] }})
            .then((res) => {
                set_entity(res || {});
                const employeeName = Array.isArray(res.employeeName)
            ? res.employeeName.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.employeeName
                ? [{ _id: res.employeeName._id, name: res.employeeName.name }]
                : [];
        setEmployeeName(employeeName);
const employeeInterest = Array.isArray(res.employeeInterest)
            ? res.employeeInterest.map((elem) => ({ _id: elem._id, skills: elem.skills }))
            : res.employeeInterest
                ? [{ _id: res.employeeInterest._id, skills: res.employeeInterest.skills }]
                : [];
        setEmployeeInterest(employeeInterest);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "JobClassified", type: "error", message: error.message || "Failed get jobClassified" });
            });
    }, [props,urlParams.singleJobClassifiedId]);


    const goBack = () => {
        navigate("/jobClassified");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">JobClassified</h3>
                </div>
                <p>jobClassified/{urlParams.singleJobClassifiedId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">SuitableJobs</label><p className="m-0 ml-3" >{_entity?.suitableJobs}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Employee Name</label>
                    {employeeName.map((elem) => (
                        <Link key={elem._id} to={`/employeeDetails/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">EmployeeInterest</label>
                    {employeeInterest.map((elem) => (
                        <Link key={elem._id} to={`/employeeDetails/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.skills}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        
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

export default connect(mapState, mapDispatch)(SingleJobClassifiedPage);
