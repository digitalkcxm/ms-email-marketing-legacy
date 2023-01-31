const axios = require("axios");

class MSSendGridService {
  async createTemplate(Authorization, name) {
    try {
      const result = await axios({
        method: "post",
        url: `${process.env.BROKER}/api/v1/template`,
        headers: {
          authorization: Authorization,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name,
          generation: "dynamic",
          sg_template_id: "",
          active: true,
        }),
      });

      return result.data;
    } catch (err) {
      return err;
    }
  }

  async createVersion(
    id_template_ms_broker,
    Authorization,
    name,
    html_content
  ) {
    try {
      const result = await axios({
        method: "post",
        url: `${process.env.BROKER}/api/v1/template/${id_template_ms_broker}/versions`,
        headers: {
          authorization: Authorization,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name,
          html_content,
          active: true,
        }),
      });

      return result.data;
    } catch (err) {
      return err;
    }
  }
}

module.exports = MSSendGridService;
