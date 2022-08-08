import * as React from "react";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";

export const config: TemplateConfig = {
  stream: {
    $id: "states",
    filter: {
      savedFilterIds: ["dm_us-directory_address_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount"
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({document}) => {
  return `${document.id.toString()}`;
};

 export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({relativePrefixToRoot, path, document}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
    ],
  };
};


 const State: Template<TemplateRenderProps> = ({relativePrefixToRoot, path, document}) => {
  const {
    _site,
    name,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function(a:any, b:any) {
    var a = a.name;
    var b = b.name;
    return (a < b) ? -1 :(a > b) ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity:any) => (
    <div>
      <a key="uRL" href={entity.slug} className="font-bold text-2xl text-blue-700 hover:underline">
        {entity.name} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));

  return (
    <>
      <PageLayout _site={_site}>
        <Banner text={_site.name}></Banner>
        <div className="centered-container">
          <BreadCrumbs name={name} parents={dm_directoryParents}></BreadCrumbs>
          <div className="section space-y-14 px-10">
              <h1 className="text-center">{_site.name} Locations - {c_addressRegionDisplayName}</h1>
              <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
                {childrenDivs}
              </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default State;