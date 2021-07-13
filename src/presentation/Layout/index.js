import React, { Component } from "react";
import { Layout, Button, Row, Col } from "antd";
import FeatherIcon from "feather-icons-react";
import { NavLink, Link } from "react-router-dom";

import { Div } from "./style";
import MenuItems from "./MenuItems";
import { leftIcon, rightIcon } from "../common/Assets/Icons";
import { ThemeProvider } from "styled-components";
import { theme } from "../common/Theme/themeVariables";
import { routes } from "../common/Routes";

const { Header, Footer, Sider, Content } = Layout;

export default class LayoutProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      hide: true,
      searchHide: true,
      activeSearch: false,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      collapsed: window.innerWidth <= 1540 && true,
    });
  }

  render() {
    const { collapsed, hide } = this.state;
    const { topMenu, rtl, darkMode, children } = this.props;
    const left = !rtl ? "left" : "right";

    const toggleCollapsed = () => {
      this.setState({
        collapsed: !collapsed,
      });
    };

    const toggleCollapsedMobile = () => {
      if (window.innerWidth <= 990) {
        this.setState({
          collapsed: !collapsed,
        });
      }
    };

    const onShowHide = () => {
      this.setState({
        hide: !hide,
        searchHide: true,
      });
    };

    const footerStyle = {
      padding: "20px 30px 18px",
      color: "rgba(0, 0, 0, 0.65)",
      fontSize: "14px",
      background: "rgba(255, 255, 255, .90)",
      width: "100%",
      boxShadow: "0 -5px 10px rgba(146,153,184, 0.05)",
    };

    const SideBarStyle = {
      margin: "63px 0 0 0",
      padding: "15px 15px 55px 15px",
      overflowY: "auto",
      height: "100vh",
      position: "fixed",
      [left]: 0,
      zIndex: 998,
    };

    return (
      <Div darkMode={darkMode}>
        <Layout className="layout">
          <Header
            style={{
              position: "fixed",
              width: "100%",
              top: 0,
              [!rtl ? "left" : "right"]: 0,
            }}
          >
            <Row>
              <Col
                lg={!topMenu ? 4 : 3}
                sm={6}
                xs={12}
                className="align-center-v navbar-brand"
              >
                {!topMenu || window.innerWidth <= 991 ? (
                  <Button type="link" onClick={toggleCollapsed}>
                    <img src={collapsed ? rightIcon : leftIcon} alt="menu" />
                  </Button>
                ) : null}
                <Link
                  className={
                    topMenu && window.innerWidth > 991
                      ? "striking-logo top-menu"
                      : "striking-logo"
                  }
                  to={routes.INITIAL}
                >
                  {/* <img src={logo} alt="" /> */}
                </Link>
              </Col>

              <Col md={0} sm={18} xs={12}>
                <>
                  <div className="mobile-action">
                    <Link className="btn-auth" onClick={onShowHide} to="#">
                      <FeatherIcon icon="more-vertical" />
                    </Link>
                  </div>
                </>
              </Col>
              <Col style={{ position: "fixed", right: "20px" }}>
                {/* </Row> */}
              </Col>
            </Row>
          </Header>
          <Layout>
            {!topMenu || window.innerWidth <= 991 ? (
              <ThemeProvider theme={theme}>
                <Sider
                  width={280}
                  style={SideBarStyle}
                  collapsed={collapsed}
                  theme={!darkMode ? "light" : "dark"}
                >
                  <MenuItems
                    topMenu={topMenu}
                    rtl={rtl}
                    toggleCollapsed={toggleCollapsedMobile}
                    darkMode={darkMode}
                  />
                </Sider>
              </ThemeProvider>
            ) : null}
            <Layout className="atbd-main-layout">
              <Content>
                {children}
                <Footer className="admin-footer" style={footerStyle}>
                  <Row>
                    <Col md={12} xs={24}>
                      <span className="admin-footer__copyright">TBH</span>
                    </Col>
                    <Col md={12} xs={24}>
                      <div className="admin-footer__links">
                        <NavLink to="#">About</NavLink>
                        <NavLink to="#">Team</NavLink>
                        <NavLink to="#">Contact</NavLink>
                      </div>
                    </Col>
                  </Row>
                </Footer>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Div>
    );
  }
}
