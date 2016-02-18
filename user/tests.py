# # coding=utf-8
# from django.test import TestCase, Client, RequestFactory
# from rest_framework.reverse import reverse
# from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
# from user.models import User
#
#
# class UserTestCase(TestCase):
# def setUp(self):
#         User.objects.create(email="borsden@gmail.com", password="borsden")
#         User.objects.create(email="second@second.com", password="second")
#         self.factory = APIRequestFactory()
#         self.client = Client()
#
#     def test_animals_can_speak(self):
#         self.client.login(email="borsden@gmail.com", password="borsden")
#         # print response.request
#
#         # print self.client.session['_auth_user_email']
#         # force_authenticate(request, user=user)
#         # self.assertEqual(response.status_code, 200)