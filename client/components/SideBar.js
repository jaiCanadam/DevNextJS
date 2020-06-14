import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./SideBar.module.css";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Container,
} from "semantic-ui-react";

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  ></Sidebar>
);

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    color="blue"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Menu.Item as="a">
      <Icon name="home" />
      <Link href="/admin">
        <a>Dashboard</a>
      </Link>
    </Menu.Item>

    <Menu.Item as="a">
      <Icon name="settings" />
      <Link href="/admin/crud/category-tag">
        <a>Manage Category and Tags</a>
      </Link>
    </Menu.Item>

    <Menu.Item as="a">
      <Icon name="edit" />
      <Link href="/admin/crud/products">
        <a>Manage Products</a>
      </Link>
    </Menu.Item>

    <Menu.Item as="a">
      <Icon name="camera" />
      Channels
    </Menu.Item>
  </Sidebar>
);

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
};
export default class SideBar extends Component {
  state = {
    animation: "overlay",
    direction: "left",
    dimmed: false,
    visible: false,
  };

  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }));

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked });

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false });

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          {vertical ? (
            <HorizontalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          ) : null}
          {vertical ? null : (
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic>
              <Header as="h2">Admin Dashboard</Header>
              <Button.Group>
                <Button
                  positive
                  circular
                  icon="settings"
                  active={direction === "left"}
                  onClick={this.handleDirectionChange("left")}
                  onClick={this.handleAnimationChange("scale down")}
                ></Button>
              </Button.Group>

              <Container className={styles.container}>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa strong. Cum
                  sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis
                  enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
                  eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis
                  vitae, justo. Nullam dictum felis eu pede link mollis pretium.
                  Integer tincidunt. Cras dapibus. Vivamus elementum semper
                  nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                  porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
                  lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                  Phasellus viverra nulla ut metus varius laoreet. Quisque
                  rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
                  Curabitur ullamcorper ultricies nisi.
                </p>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
