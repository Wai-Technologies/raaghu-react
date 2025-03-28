import React, { useEffect, useState } from "react";
import {
  RdsButton,
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
  const [navtabsItems, setNavtabsItems] = useState<any[]>([]);
  const [navtabs, setNavtabs] = useState<any[]>([]);
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [localChanges, setLocalChanges] = useState<any[]>([]);

  useEffect(() => {
    setActiveNavTabId("0");
  }, [props.isFeatureTabChange]);

  useEffect(() => {
    if (props.featuresData && props.featuresData.length > 0) {
      const navtabsData = props.featuresData.map((feature, index) => {
        return {
          id: index.toString(),
          label: (feature.displayName),
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
      setLocalChanges(navtabsData);
    }
  }, [props.featuresData]);

  const onChangeFn = (event: any, feature: any) => {
    const data = localChanges.map((x: any) => ({
      ...x,
      features: x.features?.map((f: any) => {
        return feature.name === f.name ? { ...f, value: event } : { ...f };
      }),
    }));

    setLocalChanges(data);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const initialData: any[] = JSON.parse(
      localStorage.getItem("initialFeatureData") as string
    );

    const changedData: any[] = [];
    for (let mainIndex = 0; mainIndex < initialData.length; mainIndex++) {
      for (
        let featureIndex = 0;
        featureIndex < initialData[mainIndex].features.length;
        featureIndex++
      ) {
        const initialValue = initialData[mainIndex].features[featureIndex];
        const changedValue = localChanges[mainIndex].features[featureIndex];
        if (
          initialValue.value !== changedValue.value &&
          initialValue.name === changedValue.name
        ) {
          changedData.push({
            name: changedValue.name,
            value: changedValue.value.toString(),
          });
        }
      }
    }

    setNavtabsItems(initialData);
    setLocalChanges(initialData);

    props.emittedDataFeatureData && props.emittedDataFeatureData(initialData);
    props.onFeatureSelection(changedData);
  }
  const handleActiveNavtabVertical = (id: string) => {
    setActiveNavTabId(id);
  };

  const handleRestoreDefault = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const initialData: any[] = JSON.parse(
      localStorage.getItem("initialFeatureData") as string
    );

    setNavtabsItems(initialData);
    setLocalChanges(initialData);

    props.emittedDataFeatureData && props.emittedDataFeatureData(initialData);
    props.onFeatureSelection([]);
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const initialData: any[] = JSON.parse(
      localStorage.getItem("initialFeatureData") as string
    );

    setNavtabsItems(initialData);
    setLocalChanges(initialData);

    props.emittedDataFeatureData && props.emittedDataFeatureData(initialData);
    props.onFeatureSelection([]);
  };

  return (
    <div className="row">
      <div className="col-md-5 pe-4 border-end custom-content-scroll mb-0 px-lg-3">
        <RdsNavtabs
          navtabsItems={navtabs}
          layout="Vertical"
                  fill={false}
                  style="Vertical -Pointer"
          justified={false}
          id="features"
          activeNavTabId={activeNavTabId}
          activeNavtabOrder={handleActiveNavtabVertical} type={"default"}        />
      </div>
      <div className="col-md-7 ps-4 ">
        {localChanges &&
          localChanges.map((tabsData: any, mainIndex: number) => (
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
                              label={(feature.displayName) || ""}
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
                              {(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "NUMERIC" ? (
                          <div className="form-group mb-2">
                            <RdsInput
                              inputType={"number"}
                              label={(feature.displayName) || ""}
                              dataTestId={feature.name}
                              name={"Maximum user count"}
                              value={feature.value}
                              onChange={(e: any) =>
                                onChangeFn(e.target.value, feature)
                              }
                            ></RdsInput>
                            <small className="text-secondary-50">
                              {" "}
                              {(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "BOOLEAN" ? (
                          <div className="form-group mb-2">
                            <RdsCheckbox
                              labelText={(feature.displayName) || ""}
                              checked={feature.value === true}
                              name={feature.name}
                              dataTestId={feature.name}
                              onChange={(e: any) =>
                                onChangeFn(e.target.checked, feature)
                              }
                            ></RdsCheckbox>
                            <small className="text-secondary-50">
                              {" "}
                              {(feature.description) || ""}
                            </small>
                          </div>
                        ) : feature.valueType.validator.name === "STRING" ? (
                          <div className="form-group mb-2">
                            <RdsInput
                              inputType={"number"}
                              label={(feature.displayName) || ""}
                              dataTestId={feature.name}
                              name={"Storage size"}
                              value={feature.value}
                              onChange={(e: any) =>
                                onChangeFn(e.target.value, feature)
                              }
                            ></RdsInput>
                            <small className="text-secondary-50">
                              {" "}
                              {(feature.description) || ""}
                            </small>
                          </div>
                        ) : null}
                      </>
                    ))}
                </>
              )}
            </div>
          ))}
          <div className="d-flex flex-column-reverse flex-lg-row ps-lg-3 flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 px-4 ms-1 ">
          
          <RdsButton
                    label="Restore to Default"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    dataTestId="cancel"
                    onClick={handleRestoreDefault}
                ></RdsButton>
        <RdsButton
                    label="Cancel"
                    databsdismiss="offcanvas"
                    type={"button"}
                    size="small"
                    isOutline={true}
                    colorVariant="primary"
                    dataTestId="cancel"
                    onClick={handleCancel}
                ></RdsButton>
             
              <RdsButton
                label="Save"
                type={"button"}
                size="small"
                databsdismiss="offcanvas"
                colorVariant="primary"
                onClick={handleSave}
                dataTestId="save"
              ></RdsButton>                  
        </div>
      </div>
    </div>
  );
};

export default RdsCompFeatures;