import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import PropTypes from "prop-types";
import GroceryForm from "../components/GroceryForm";
import GroceryItem from "../components/GroceryItem";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const GroceryCard = styled.div`
  margin: 10px;
`;

class GroceryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        id: 0,
        title: ""
      }
    };
  }

  handleChange = e => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.course.title !== "") {
      this.props.dispatch(courseActions.createCourse(this.state.course));
      this.setState({
        course: {
          id: this.state.course.id + 1,
          title: ""
        }
      });
    }
  };

  render() {
    const { courses } = this.props;
    return (
      <Row>
        <GroceryCard>
          <GroceryForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            courses={courses}
            courseTitle={this.state.course.title}
          />
          {courses.map((course, index) => {
            return (
              <GroceryItem key={index} title={course.title} id={course.id} />
            );
          })}
        </GroceryCard>
      </Row>
    );
  }
}

GroceryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

export default connect(mapStateToProps)(GroceryContainer);