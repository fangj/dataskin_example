import React from "react";
import { Card, Button, ConfigProvider } from 'antd';
import { getUnit, saveUnit } from "../../services/UnitRestfulService";
import "./coffee.css";

class UnitStore {
    data = { total: 0 }
    key = "";

    constructor(key) {
        this.key = key;
        getUnit(key).then(data => {
            if (data) {
                this.data = data;
            }
        })
    }

    increase() {
        this.data.total += 1;
        saveUnit(this.key, this.data);
    }

}


const store = new UnitStore("coffee");

export default function ControlPage() {
    return (
        <div className="coffee_bg ">
            <div className="page_container">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00b96b',
                        },
                    }}
                >
                    <Button type="primary" onClick={() => store.increase()}>加一杯</Button>
                </ConfigProvider>
            </div>
        </div>)
}

