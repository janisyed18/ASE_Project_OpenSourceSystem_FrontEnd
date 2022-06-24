import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { getUserName, getUserNameWithoutSpace, isAdmin, removeUnderscore } from "../../utils/authentication";
// import { useNavigate } from 'react-router-dom';

function ViewProject(props) {
  const [project, setProject] = useState();
  const [reason, setReason] = useState("");
  const isAdminLoggedIn = isAdmin();
  const isAcknowledged = project?.acknowledgedBy;

  const changeReason = (e) => {
    setReason(e.target.value);
  };

  const getProject = () => {
    if (getProjId()) {
      fetch(
        `http://localhost:8080/open-source-project/project/${getProjId()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          console.log(res);
          setProject(res);

          if (res !== null) {
            // props.history.push('/');
          } else {
            // alert("fails");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClickCreateProject = () => {
    props.history.push("/project/create");
  };

  useEffect(() => {
    getProject();
  }, []);

  const navigateToProject = (proj) => {
    props.history.push("/project/create");
  };
  const userName = getUserNameWithoutSpace();
  const enableApprove = project && isAdmin() && project.createdBy !== userName;

  const updateProject = (toApprove) => {
    const updateProjectData = {
      ...project,
      acknowledgedBy: getUserNameWithoutSpace(),
      acknowledgedDate: +new Date(),
      lastModifiedDate: +new Date(),
      status: toApprove ? "approved" : "declined",
      reason,
    };

    fetch(`http://localhost:8080/open-source-project/project/${getProjId()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProjectData),
    })
      .then((res) => res.json())
      .then((res) => {
        // do action
        props.history.goBack();

      })
      .catch((err) => console.log(err));
  };

  const editProject = () => {
    console.log(props);
    const url = `/project/edit/${getProjId()}`;
    // navigate(url);

    props.history.replace(url);
  };

  const getProjId = () => props.match.params.id;

  const deleteProject = () => {
    fetch(`http://localhost:8080/open-source-project/project/${getProjId()}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        // do action
        props.history.goBack();
      })
      .catch((err) => console.log(err));
  };

  const isSameUserCreated = project?.createdBy === getUserNameWithoutSpace();

  const getAcknowledgeAlert = () => {
    const status = project.status;
    const text = `This project is ${status} by ${removeUnderscore(project.acknowledgedBy)}`;
    switch (status) {
      case "declined":
        return   <Alert variant="danger">{text}</Alert>;
      case "approved":
        return <Alert variant="success">{text}</Alert>;
    }
  }

  return (
    <div className="container-spacing">
      <div className="header-row">
        <h2 className="Projects"> View Project / {project?.name}</h2>

        {isSameUserCreated && !isAcknowledged && (
          <div className="project-action-wrapper header-actions">
            <Button
              variant="outline-primary"
              type="submit"
              onClick={() => editProject()}
            >
              Edit
            </Button>

            <Button
              variant="outline-primary"
              type="submit"
              onClick={() => deleteProject()}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
{project  && 
<>
      <div className="created-row">
        <div className="created-key">Created By</div>
        <div className="created-value">{project?.createdBy.split("_").join(" ")} </div>

        </div> 


      <div className="created-row">
        <div className="created-key">Created At</div>
        <div className="created-value"> {new Date(project?.createdDate).toLocaleDateString("en-US")} </div>

        </div> 

        <div className="proj-desc">Description</div>

      <div className="project-desc">{project.description}</div>

        </>
}


    

      {enableApprove && !isAcknowledged && (
        <div className="reason-container">
        <Form.Group controlId="formBasicEmail">
          {/* <Form.Label>Reason</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Reason"
            onChange={changeReason}
            name="first_name"
          />
        </Form.Group>
        </div>
      )}

{isAdminLoggedIn && !isAcknowledged && (
        <div className="header-actions approve-btns">
          <Button
            variant="success"
            disabled={!enableApprove}
            type="submit"
            onClick={() => updateProject(true)}
          >
            Approve
          </Button>

          <Button
            variant="danger"
            disabled={!enableApprove}
            type="submit"
            onClick={() => updateProject()}
          >
            Decline
          </Button>
        </div>
      )}

      {isAcknowledged && <div className="ack-alert">
      {getAcknowledgeAlert()}
        
        </div>}

        {isAcknowledged && <div className="ack-reason">{project.reason}</div>}
    </div>
  );
}

export default ViewProject;
