import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const JobClassifiedCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [employeeName, setEmployeeName] = useState([])
const [employeeInterest, setEmployeeInterest] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [employeeName,employeeInterest], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            employeeName: _entity?.employeeName?._id,employeeInterest: _entity?.employeeInterest?._id,suitableJobs: _entity?.suitableJobs,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("jobClassified").create(_data);
        const eagerResult = await client
            .service("jobClassified")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "employeeName",
                    service : "employeeDetails",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info JobClassified updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in JobClassified" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount employeeDetails
                    client
                        .service("employeeDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleEmployeeDetailsId } })
                        .then((res) => {
                            setEmployeeName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "EmployeeDetails", type: "error", message: error.message || "Failed get employeeDetails" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const employeeNameOptions = employeeName.map((elem) => ({ name: elem.name, value: elem.value }));
const employeeInterestOptions = employeeInterest.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create JobClassified" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="jobClassified-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="employeeName">Employee Name:</label>
                <Dropdown id="employeeName" value={_entity?.employeeName?._id} optionLabel="name" optionValue="value" options={employeeNameOptions} onChange={(e) => setValByKey("employeeName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employeeName"]) ? (
              <p className="m-0" key="error-employeeName">
                {error["employeeName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="employeeInterest">EmployeeInterest:</label>
                <Dropdown id="employeeInterest" value={_entity?.employeeInterest?._id} optionLabel="name" optionValue="value" options={employeeInterestOptions} onChange={(e) => setValByKey("employeeInterest", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employeeInterest"]) ? (
              <p className="m-0" key="error-employeeInterest">
                {error["employeeInterest"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="suitableJobs">SuitableJobs:</label>
                <InputText id="suitableJobs" className="w-full mb-3 p-inputtext-sm" value={_entity?.suitableJobs} onChange={(e) => setValByKey("suitableJobs", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["suitableJobs"]) ? (
              <p className="m-0" key="error-suitableJobs">
                {error["suitableJobs"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(JobClassifiedCreateDialogComponent);
