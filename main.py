#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
from google.appengine.ext import ndb
import json, logging

#Definições do banco

#definição dos objetos

class pais(ndb.Model):
	nome = ndb.StringProperty()

class uf(ndb.Model):
	nome = ndb.StringProperty()

class regiao(ndb.Model):
	nome = ndb.StringProperty()

class nucleo(ndb.Model):
	grau_ua = ndb.StringProperty()
	nome = ndb.StringProperty()
	representante = ndb.StringProperty()

#função auxiliar json

# def json_handler(o):
# 	logging.info(type(o))
# 	if type(o) is unicode or type(o) is str:
# 		return o

def getPostData(data):
	ret = {}
	for x in data:
		ret[x[0]] = x[1]
	return ret

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world!')

class PaisHandler(webapp2.RequestHandler):
    def post(self):
	logging.info(self.request.url)
    	action = self.request.url.split('/')[-1]
    	logging.info(action)
    	res = ""
	
	if action == 'inserir_ancestral' :
    		logging.info(u'Inserção')
    		obj = pais()
    		pdata = getPostData(self.request.POST.items())
		logging.info(pdata)
		data = {'nome': pdata[u'pais_nome']}
		pais_key = pdata.pop(u'pais_key')
		logging.info(pais_key)
		logging.info(data)
		key = ndb.Key('pais', '0')
		obj.key = key
    		CrudHandler(obj, data)
    		res = 'objeto inserido!'
	
    	if action == 'inserir' :
    		logging.info(u'Inserção')
    		obj = pais()
    		pdata = getPostData(self.request.POST.items())
		logging.info(pdata)
		data = {'nome': pdata[u'pais_nome']}
		pais_key = pdata.pop(u'pais_key')
		logging.info(pais_key)
		logging.info(data)
		key = ndb.Key('pais', '0', 'pais', pais_key)
		obj.key = key
    		CrudHandler(obj, data)
    		res = 'objeto inserido!'

    	elif action == 'listar':
    		# logging.info('Listagem')
    		db_res = pais.query()
    		aux = []
    		for item in db_res.fetch():
    			d = item.to_dict()
    			d['uid'] = item.key.id()
    			aux.append(d)
    		res = json.dumps(aux)
    		logging.info(res)
    	elif action == 'remover':
    		logging.info(u'Remoção')
    		pass
        self.response.write(res)

class UaHandler(webapp2.RequestHandler):
    def post(self):
    	action = self.request.url.split('/')[-1]
    	logging.info(action)
    	res = ""
    	if action == 'inserir' :
    		logging.info(u'Inserção!')
    		obj = nucleo()
    		pdata = getPostData(self.request.POST.items())
		data = {'nome': pdata['pais_nome']}
    		CrudHandler(obj, data)
    		res = 'objeto inserido!'

    	elif action == 'listar':
    		# logging.info('Listagem')
    		ua = nucleo.query()
    		aux = []
    		for item in ua.fetch():
    			d = item.to_dict()
    			d['uid'] = item.key.id()
    			aux.append(d)
    		res = json.dumps(aux)
    		logging.info(res)
    	elif action == 'remover':
    		logging.info(u'Remoção')
    		pass
        self.response.write(res)

def CrudHandler(obj,data):
	logging.info('CrudHandler')
	logging.info(data)
	#Gravar UM elemento no banco
	# data = getPostData(req.POST.items())
	for p,v in data.iteritems():
	    # logging.info(p)
	    # logging.info(v)fl;
	    setattr(obj, p, v)
	# obj.grau_ua = data['grau_ua']
	# obj.nome = data['nome']
	# obj.representante = data['representante']
	obj.put()
	# ua.get()
	ret = ""
	ret = obj.to_dict()
	ret['uid'] = obj.key.id()
	logging.info(ret)
	return ret

class NullHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('NullHandler get')
    def post(self):
        self.response.write('NullHandler post')
    def put(self):
        self.response.write('NullHandler put')
    def delete(self):
        self.response.write('NullHandler delete')

app = webapp2.WSGIApplication([
    #('/', MainHandler),
    # ('/teste', MeuHandler),
    ('/app/ua/.*', UaHandler),
    ('/app/pais/.*', PaisHandler),
    ('/app/.*', NullHandler)
], debug=True)
