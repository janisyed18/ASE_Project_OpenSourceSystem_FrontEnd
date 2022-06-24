import React, { useEffect, useState } from "react";
import { Form, Button, Card, Placeholder, Badge } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { getUserNameWithoutSpace, isLoggedIn } from "../../utils/authentication";

function Projects(props) {

  const [projects, setProjects] = useState([]);

  const [showingMyProjects, setshowingMyProjects] = useState(false);



  const loadersLength = new Array(4).fill("");
  const getProjects = () => {
    let url = "http://localhost:8080/open-source-project/project";
    console.log({projects});

    if(showingMyProjects) {
      // url += `/createdBy/${getUserNameWithoutSpace()}`
      const newProjects = projects.filter((proj) => proj.createdBy === getUserNameWithoutSpace());
      setProjects(newProjects);
    } else {
        fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        setTimeout(() => {
          setProjects(res);
        }, 0);

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
    getProjects();
  }, [showingMyProjects]);

  const getProjStatus = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge bg="success" text="dark">
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge bg="danger" text="dark">
            Declined
          </Badge>
        );
      default:
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
    }
  };

  const navigateToProject = (proj) => {
    props.history.push(`/project/view/${proj.id}`);
  };


  const toggleProjectsView = ()=> {
    setshowingMyProjects((val) => !val);
  }

  const isLogIn = isLoggedIn();
 if(!isLogIn) {
   props.history.push("/");
 }

  return (
    <div className="container-spacing">
      <div className="header-row">
        <h1 className="Projects">Projects</h1>
        <div className="header-actions">
        <Button
          variant="outline-primary"
          type="submit"
          onClick={toggleProjectsView}
        >
          {showingMyProjects ? "All Projects" : "My Projects"}
        </Button>
        <Button
          variant="outline-primary"
          type="submit"
          onClick={onClickCreateProject}
        >
          Create Project
        </Button>
        </div>
      </div>

      <div className="cards-wrapper">
        {!projects?.length ? <div className="no-project">No Projects to display</div> : ""}
        {projects.map((proj) => (
          <Card style={{ width: "18rem" }} key={proj?.id}  onClick={() => navigateToProject(proj)}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <div className="card-name">
              {" "}
              <div className="name-wrapper">
                {proj.name[0] + " " + proj.name[1]}
              </div>{" "}
            </div>
            <Card.Body>
              <Card.Title>{proj.name}</Card.Title>
              <Card.Text>{proj.description}</Card.Text>
              <div className="info-value-row">
                <div className="info-label">Created By</div>
                <div className="info-value">{proj.createdBy}</div>
              </div>

              <div className="info-value-row">
                <div className="info-label">License</div>
                <div className="info-value">{proj.license || "-"}</div>
              </div>

              {getProjStatus(proj.status)}
            </Card.Body>
          </Card>
        ))}
        {/* {!projects?.length &&
          loadersLength.map((loader, index) => {
            return (
              <>
                <Card style={{ width: "18rem" }} key={index}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                      <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                      <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                  </Card.Body>
                </Card>
              </>
            );
          })} */}
      </div>
      {/* <Signup /> */}
    </div>
  );
}

export default Projects;
