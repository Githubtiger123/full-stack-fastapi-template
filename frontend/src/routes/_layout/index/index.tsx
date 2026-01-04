import React from "react"
import { Card, Col, Row } from "antd"

import "./index.css"

const coverImg = "/assets/images/fastapi-icon.svg"

const Home: React.FC = () => (
  <div className="dashboard-page">
    <Row gutter={[16, 16]} className="dashboard-row">
      <Col xs={24} sm={16} md={12} lg={8} xl={6} span={1}>
        <Card hoverable style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={coverImg}
              alt="FastAPI"
              className="dashboard-avatar"
            />
            <div>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.2 }}>admin</p>
              <p style={{ margin: "6px 0 0", opacity: 0.7 }}>超级管理员</p>
            </div>
          </div>
          <div className="dashboard-divider"></div>
          <div className="login-info">
            <p>登录时间 <span>2026-01-01 12:00:00</span></p>
            <p>登录地点 <span>北京市海淀区</span></p>
          </div>
        </Card>
      </Col>
      <col span={2}>
      </col>
    </Row>
  </div>
)

export default Home