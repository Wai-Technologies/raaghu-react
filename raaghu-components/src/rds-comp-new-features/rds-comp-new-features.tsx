import React, { useEffect, useState } from "react";
import {
  RdsCheckbox,
  RdsInput,
  RdsNavtabs,
  RdsSelectList,
} from "../../../raaghu-elements/src";
import { useTranslation } from "react-i18next";

export interface RdsCompFeatureProps {
  featuresData: any[];
  onFeatureSelection: (distinctData: any) => any;
  emittedDataFeatureData?: (data: any) => any;
  isFeatureTabChange?: string;
}

const RdsCompFeatures = (props: RdsCompFeatureProps) => {
  const { t } = useTranslation();
  const [navtabsItems, setNavtabsItems] = useState<any[]>([]);
  const [navtabs, setNavtabs] = useState<any[]>([]);
  const [activeNavTabId, setActiveNavTabId] = useState("0");


  useEffect(() => {
    setActiveNavTabId("0");
  }, [props.isFeatureTabChange]);
  useEffect(() => {
    if (props.featuresData && props.featuresData.length > 0) {
      const navtabsData = props.featuresData.map((feature, index) => {
        return {
          id: index.toString(),
          label: t(feature.displayName),
          tablink: "#" + feature.name,
          name: feature.name,
          features:
            feature.features &&
            feature.features.map((x: any) =>
              x.valueType.validator.name === "BOOLEAN"
                ? {
                    ...x,
                    value:
                      typeof x.value === "string"
                        ? x.value.toLowerCase() === "false"
                          ? false
                          : x.value.toLowerCase() === "true"
                          ? true
                          : x.value
                        : x.value,
                  }
                : x.valueType.validator.name === "NUMERIC" &&
                  typeof x.value === "string"
                ? { ...x, value: parseInt(x.value) }
                : { ...x }
            ),
        };
      });

      localStorage.setItem("initialFeatureData", JSON.stringify(navtabsData));
      setNavtabsItems(navtabsData);
      setNavtabs(navtabsData);
    }
  }, [props.featuresData]);

  useEffect(() => {
    const navtabData: any[] = [];
    props.featuresData?.forEach((ele, i) => {
      if (ele) {
        const item = {
          id: i,
          label: ele.displayName,
          tablink: "#" + `${ele.name}`,
          name: ele.name,
          features:
            ele.features &&
            ele.features?.map((x: any) =>
              x.valueType.validator.name === "BOOLEAN"
                ? {
                    ...x,
                    value:
                      typeof x.value === "string"
                        ? x.value.toLowerCase() === "false"
                          ? false
                          : x.value.toLowerCase() === "true"
                          ? true
                          : x.value
                        : x.value,
                  }
                : x.valueType.validator.name === "NUMERIC" &&
                  typeof x.value === "string"
                ? { ...x, value: parseInt(x.value) }
                : { ...x }
            ),
        };
        navtabData.push(item);
      }
    });
    localStorage.setItem("initailFeatureData", JSON.stringify(navtabData));
    setNavtabsItems(navtabData);
  }, [props.featuresData]);

  function onChangeFn(event: any, feature: any) {
    const data = navtabsItems?.map((x: any) => ({
      ...x,
      features: x.features?.map((f: any) => {
        return feature.name === f.name ? { ...f, value: event } : { ...f };
      }),
    }));
    const initailData: any[] = JSON.parse(
      localStorage.getItem("initailFeatureData") as string
    );
    const changedData: any[] = [];
    for (let mainIndex = 0; mainIndex < initailData.length; mainIndex++) {
      for (
        let featureIndex = 0;
        featureIndex < initailData[mainIndex].features.length;
        featureIndex++
      ) {
        const initialValue = initailData[mainIndex].features[featureIndex];
        const changedValue = data[mainIndex].features[featureIndex];
        initialValue.value !== changedValue.value &&
          initialValue.name === changedValue.name &&
          changedData.push({
            name: changedValue.name,
            value: changedValue.value.toString(),
          });
      }
    }
    setNavtabsItems(data);

    const initialFeaturesData = data.map((ele: any) => ({
      displayName: ele.label,
      name: ele.name,
      features: ele.features?.map((x: any) => {
        if (x.valueType.validator.name === "BOOLEAN") {
          return { ...x, value: x.value ? "True" : "False" };
        } else if (x.valueType.validator.name === "NUMERIC") {
          return { ...x, value: x.value.toString() };
        } else {
          return { ...x };
        }
      }),
    }));
    props.emittedDataFeatureData &&
    props.emittedDataFeatureData(initialFeaturesData);
    props.onFeatureSelection(changedData);
  }
  const handleActiveNavtabVertical = (id: string) => {
    setActiveNavTabId(id);
  };
  return (
    <div className="row">
      <div className="col-md-5 pe-4 border-end">
        <RdsNavtabs
          navtabsItems={navtabs}
          type="vertical"
          fill={false}
          justified={false}
          activeNavTabId={activeNavTabId}
          activeNavtabOrder={handleActiveNavtabVertical}
        />
      </div>
      <div className="col-md-7 ps-4">
        {navtabsItems &&
          navtabsItems?.map((tabsData: any, mainIndex: number) => (
            <div key={mainIndex}>
              {activeNavTabId == mainIndex.toString() && (
                <>
                  {tabsData.features &&
                    tabsData.features?.map((feature: any) => (
                      <>
                        {feature.valueType.validator.name === "NULL" ? (
                          <div className="form-group mb-2">
                            <RdsSelectList
                              id="feaDis"
                              label={t(feature.displayName) || ""}
                              selectItems={feature.valueType?.itemSource?.items?.map(
                                (x: any) => ({ ...x, option: x.value })
                              )}
                              onChange={(item: any) =>
                                onChangeFn(item.value, feature)
                              }
                              selectedValue={feature.value}
                            ></RdsSelectList>
                            <small className="text-secondary-50">
                              {" "}
                              {t(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "NUMERIC" ? (
                          <div className="form-group mb-2">
                            <RdsInput
                              inputType={"number"}
                              label={t(feature.displayName) || ""}
                              dataTestId={feature.name}
                              name={feature.name}
                              value={feature.value}
                              onChange={(e: any) =>
                                onChangeFn(e.target.value, feature)
                              }
                            ></RdsInput>
                            <small className="text-secondary-50">
                              {" "}
                              {t(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "BOOLEAN" ? (
                          <div className="form-group mb-2">
                            <RdsCheckbox
                              label={t(feature.displayName) || ""}
                              checked={feature.value === true}
                              name={feature.name}
                              dataTestId={feature.name}
                              onChange={(e: any) =>
                                onChangeFn(e.target.checked, feature)
                              }
                            ></RdsCheckbox>
                            <small className="text-secondary-50">
                              {" "}
                              {t(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "STRING" ? (
                          <div className="form-group mb-2">
                            <RdsInput
                              inputType={"number"}
                              label={t(feature.displayName) || ""}
                              dataTestId={feature.name}
                              name={feature.name}
                              value={feature.value}
                              onChange={(e: any) =>
                                onChangeFn(e.target.value, feature)
                              }
                            ></RdsInput>
                            <small className="text-secondary-50">
                              {" "}
                              {t(feature.description) || ""}
                            </small>
                          </div>
                        ) : null}
                      </>
                    ))}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RdsCompFeatures;
