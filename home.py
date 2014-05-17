#!/usr/bin/env python
# -*- coding: utf-8 -*-
import webapp2

class HomeHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('HomeHandler get')
        self.response.write('HomeHandler get')
    def post(self):
        self.response.write('HomeHandler post')
    def put(self):
        self.response.write('HomeHandler put')
    def delete(self):
        self.response.write('HomeHandler delete')

class HomeHandler2(webapp2.RequestHandler):
    def get(self):
        self.redirect('/index.html')
    def post(self):
        self.response.write('HomeHandler2 post')
    def put(self):
        self.response.write('HomeHandler2 put')
    def delete(self):
        self.response.write('HomeHandler2 delete')

app = webapp2.WSGIApplication([
    ('/', HomeHandler2),
    ('/.*', HomeHandler2)
], debug=True)