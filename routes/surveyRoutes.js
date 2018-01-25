const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
module.exports = app => {
  app.get('/api/surveys/thanks', (req,res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', requireLogin,requireCredits, (req,res) => {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey ({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email })),
        _user: req.user.id,
        dateSent: Date.now()
      });
      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
           mailer.send();
           survey.save()
           .then(() =>  req.user.credits -= 1)
           .then(() => req.user.save())
           .then ((user) => {
             console.log(user);
             res.send(user);
        });
    } catch (err) {
        console.log(err);
        res.status(422).send(err);
      }
    });
};
