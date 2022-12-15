import * as React from "react";
import PageLayout from "../components/PageLayout";
import MenuSection from "../components/MenuSection";
import Banner from "../components/banner";
import Favicon from "../public/yext-favicon.ico";
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
    $id: "menu",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "richTextDescription",
      "photoGallery",
      "slug",
      "c_relatedMenuItems.name",
      "c_relatedMenuItems.id",
      "c_relatedMenuItems.c_itemCategory",
      "c_relatedMenuItems.richTextDescription",
      "c_relatedMenuItems.photoGallery",
      "c_relatedMenuItems.slug"
    ],
    filter: {
      entityTypes: ["ce_menu"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({document}) => {
  return `menu`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({relativePrefixToRoot, path, document}): HeadConfig => {
  return {
    title: "Locator Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "This site was generated by the Yext SSG",
        },
      },
      {
        type: "link",
        attributes: {
          rel: 'icon',
          type: 'image/x-icon',
          href: Favicon
        },
      }
    ],
  };
};

const Menu: Template<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
    __meta
  }) => {
  const {
    _site,
    name,
    richTextDescription,
    photoGallery,
    slug,
    c_relatedMenuItems,
  } = document;

  const tacos = [], quesadillas = [], drinks = []; 
  
  c_relatedMenuItems.forEach((item) => {
   if (item.c_itemCategory == "TACOS") {
     tacos.push(item);
   } else if (item.c_itemCategory == "QUESADILLAS") {
     quesadillas.push(item);
   } else {
     drinks.push(item)
   }
  });

  const tacoDivs = tacos.map((item:any) => (
   <a href={item.slug}>
     <div className="card p-5 border-2 rounded-xl space-y-3 bg-gray-100 drop-shadow-md">
       <img src={item.photoGallery[0].image.url} className="rounded-xl w-100 h-auto"/>
       <div className="name pt-2 text-2xl text-center font-bold">{item.name}</div>
     </div>
   </a>
 ));

  const quesadillaDivs = quesadillas.map((item:any) => (
   <a href={item.slug}>
     <div className="card p-5 border-2 rounded-xl space-y-3 bg-gray-100 drop-shadow-md">
       <img src={item.photoGallery[0].image.url} className="rounded-xl w-100 h-auto"/>
       <div className="name pt-2 text-2xl text-center font-bold">{item.name}</div>
     </div>
   </a>
 ));

  const drinkDivs = drinks.map((item:any) => (
   <a href={item.slug}>
     <div className="card p-5 border-2 rounded-xl space-y-3 bg-gray-100 drop-shadow-md">
       <img src={item.photoGallery[0].image.url} className="rounded-xl w-100 h-auto"/>
       <div className="name pt-2 text-2xl text-center font-bold">{item.name}</div>
     </div>
   </a>
 ));

  return (
    <>
      <PageLayout _site={_site} templateData={{__meta, document}}>
        <div className="centered-container">
          <h1 className="section text-4xl text-center font-bold">Menu Items</h1>
          <MenuSection title="Tacos" children={tacoDivs}/>
          <MenuSection title="Quesadillas" children={quesadillaDivs}/>
          <MenuSection title="Drinks" children={drinkDivs}/>
          <Banner text="Our Menu"/>
        </div>
      </PageLayout>
    </>
  );
};

export default Menu;
