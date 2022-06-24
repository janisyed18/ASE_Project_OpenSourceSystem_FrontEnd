import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { getUserName, getUserNameWithoutSpace } from "../../utils/authentication";

function CreateProject(props) {
  console.log({ props });
  const [project, setProject] = useState({
    name: "",
    description: "",
    license: "",
    createdBy: getUserNameWithoutSpace(),
    createdDate: +new Date(),
  });

  const isEditProject = props.match.path.includes("edit");

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

  useEffect(() => {
    isEditProject && getProject();
  }, []);

  const getProjId = () => props.match.params.id;

  const changeValue = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const getSubmitPromise= () => {
    if(isEditProject) {
      return fetch(`http://localhost:8080/open-source-project/project/${getProjId()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
    }
    return fetch("http://localhost:8080/open-source-project/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
  }

  const submitLogin = (e) => {
    e.preventDefault();
    getSubmitPromise()
      .then((res) => {
        console.log(1, res);
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        console.log(res);
        if (res !== null) {
          props.history.push("/projects");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-spacing ">
      <div className="header-row">
        <h1 className="Projects">
          {isEditProject ? "Edit" : "Create"} Project
        </h1>
      </div>
      <Form onSubmit={submitLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={changeValue}
            name="name"
            value={project.name}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={changeValue}
            name="description"
            value={project.description}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>License</Form.Label>
          <Form.Control
            type="text"
            placeholder="license"
            onChange={changeValue}
            name="license"
            value={project.license}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;
